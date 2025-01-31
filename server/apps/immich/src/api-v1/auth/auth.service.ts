import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@app/infra';
import { AuthType } from '../../constants/jwt.constant';
import { AuthUserDto } from '../../decorators/auth-user.decorator';
import { ImmichJwtService } from '../../modules/immich-jwt/immich-jwt.service';
import { IUserRepository } from '@app/domain';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AdminSignupResponseDto, mapAdminSignupResponse } from './response-dto/admin-signup-response.dto';
import { LoginResponseDto } from './response-dto/login-response.dto';
import { LogoutResponseDto } from './response-dto/logout-response.dto';
import { OAuthService } from '../oauth/oauth.service';
import { UserCore } from '@app/domain';
import { SystemConfigService, INITIAL_SYSTEM_CONFIG } from '@app/domain';
import { SystemConfig } from '@app/infra';

@Injectable()
export class AuthService {
  private userCore: UserCore;
  private logger = new Logger(AuthService.name);

  constructor(
    private oauthService: OAuthService,
    private immichJwtService: ImmichJwtService,
    @Inject(IUserRepository) userRepository: IUserRepository,
    private configService: SystemConfigService,
    @Inject(INITIAL_SYSTEM_CONFIG) private config: SystemConfig,
  ) {
    this.userCore = new UserCore(userRepository);
    this.configService.config$.subscribe((config) => (this.config = config));
  }

  public async login(loginCredential: LoginCredentialDto, clientIp: string): Promise<LoginResponseDto> {
    if (!this.config.passwordLogin.enabled) {
      throw new UnauthorizedException('Password login has been disabled');
    }

    let user = await this.userCore.getByEmail(loginCredential.email, true);

    if (user) {
      const isAuthenticated = await this.validatePassword(loginCredential.password, user);
      if (!isAuthenticated) {
        user = null;
      }
    }

    if (!user) {
      this.logger.warn(`Failed login attempt for user ${loginCredential.email} from ip address ${clientIp}`);
      throw new BadRequestException('Incorrect email or password');
    }

    return this.immichJwtService.createLoginResponse(user);
  }

  public async logout(authType: AuthType): Promise<LogoutResponseDto> {
    if (authType === AuthType.OAUTH) {
      const url = await this.oauthService.getLogoutEndpoint();
      if (url) {
        return { successful: true, redirectUri: url };
      }
    }

    return { successful: true, redirectUri: '/auth/login?autoLaunch=0' };
  }

  public async changePassword(authUser: AuthUserDto, dto: ChangePasswordDto) {
    const { password, newPassword } = dto;
    const user = await this.userCore.getByEmail(authUser.email, true);
    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await this.validatePassword(password, user);
    if (!valid) {
      throw new BadRequestException('Wrong password');
    }

    return this.userCore.updateUser(authUser, authUser.id, { password: newPassword });
  }

  public async adminSignUp(dto: SignUpDto): Promise<AdminSignupResponseDto> {
    const adminUser = await this.userCore.getAdmin();

    if (adminUser) {
      throw new BadRequestException('The server already has an admin');
    }

    try {
      const admin = await this.userCore.createUser({
        isAdmin: true,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: dto.password,
      });

      return mapAdminSignupResponse(admin);
    } catch (error) {
      this.logger.error(`Unable to register admin user: ${error}`, (error as Error).stack);
      throw new InternalServerErrorException('Failed to register new admin user');
    }
  }

  private async validatePassword(inputPassword: string, user: UserEntity): Promise<boolean> {
    if (!user || !user.password) {
      return false;
    }
    return await bcrypt.compare(inputPassword, user.password);
  }
}
