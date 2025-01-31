import { immichAppConfig } from '@app/common/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AssetModule } from './api-v1/asset/asset.module';
import { AuthModule } from './api-v1/auth/auth.module';
import { ImmichJwtModule } from './modules/immich-jwt/immich-jwt.module';
import { DeviceInfoModule } from './api-v1/device-info/device-info.module';
import { ConfigModule } from '@nestjs/config';
import { ServerInfoModule } from './api-v1/server-info/server-info.module';
import { BackgroundTaskModule } from './modules/background-task/background-task.module';
import { CommunicationModule } from './api-v1/communication/communication.module';
import { AlbumModule } from './api-v1/album/album.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksModule } from './modules/schedule-tasks/schedule-tasks.module';
import { JobModule } from './api-v1/job/job.module';
import { OAuthModule } from './api-v1/oauth/oauth.module';
import { TagModule } from './api-v1/tag/tag.module';
import { ShareModule } from './api-v1/share/share.module';
import { DomainModule } from '@app/domain';
import { InfraModule } from '@app/infra';
import { APIKeyController, SystemConfigController, UserController } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),

    DomainModule.register({
      imports: [InfraModule],
    }),

    AssetModule,

    AuthModule,
    OAuthModule,

    ImmichJwtModule,

    DeviceInfoModule,

    ServerInfoModule,

    BackgroundTaskModule,

    CommunicationModule,

    AlbumModule,

    ScheduleModule.forRoot(),

    ScheduleTasksModule,

    JobModule,

    TagModule,

    ShareModule,
  ],
  controllers: [
    //
    AppController,
    APIKeyController,
    SystemConfigController,
    UserController,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  // TODO: check if consumer is needed or remove
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV == 'development') {
      // consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
  }
}
