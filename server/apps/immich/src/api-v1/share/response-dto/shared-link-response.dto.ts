import { SharedLinkEntity, SharedLinkType } from '@app/infra';
import { ApiProperty } from '@nestjs/swagger';
import _ from 'lodash';
import { AlbumResponseDto, mapAlbumExcludeAssetInfo } from '../../album/response-dto/album-response.dto';
import { AssetResponseDto, mapAsset, mapAssetWithoutExif } from '../../asset/response-dto/asset-response.dto';

export class SharedLinkResponseDto {
  id!: string;
  description?: string;
  userId!: string;
  key!: string;

  @ApiProperty({ enumName: 'SharedLinkType', enum: SharedLinkType })
  type!: SharedLinkType;
  createdAt!: string;
  expiresAt!: string | null;
  assets!: AssetResponseDto[];
  album?: AlbumResponseDto;
  allowUpload!: boolean;
  allowDownload!: boolean;
  showExif!: boolean;
}

export function mapSharedLink(sharedLink: SharedLinkEntity): SharedLinkResponseDto {
  const linkAssets = sharedLink.assets || [];
  const albumAssets = (sharedLink?.album?.assets || []).map((albumAsset) => albumAsset.assetInfo);

  const assets = _.uniqBy([...linkAssets, ...albumAssets], (asset) => asset.id);

  return {
    id: sharedLink.id,
    description: sharedLink.description,
    userId: sharedLink.userId,
    key: sharedLink.key.toString('hex'),
    type: sharedLink.type,
    createdAt: sharedLink.createdAt,
    expiresAt: sharedLink.expiresAt,
    assets: assets.map(mapAsset),
    album: sharedLink.album ? mapAlbumExcludeAssetInfo(sharedLink.album) : undefined,
    allowUpload: sharedLink.allowUpload,
    allowDownload: sharedLink.allowDownload,
    showExif: sharedLink.showExif,
  };
}

export function mapSharedLinkWithNoExif(sharedLink: SharedLinkEntity): SharedLinkResponseDto {
  const linkAssets = sharedLink.assets || [];
  const albumAssets = (sharedLink?.album?.assets || []).map((albumAsset) => albumAsset.assetInfo);

  const assets = _.uniqBy([...linkAssets, ...albumAssets], (asset) => asset.id);

  return {
    id: sharedLink.id,
    description: sharedLink.description,
    userId: sharedLink.userId,
    key: sharedLink.key.toString('hex'),
    type: sharedLink.type,
    createdAt: sharedLink.createdAt,
    expiresAt: sharedLink.expiresAt,
    assets: assets.map(mapAssetWithoutExif),
    album: sharedLink.album ? mapAlbumExcludeAssetInfo(sharedLink.album) : undefined,
    allowUpload: sharedLink.allowUpload,
    allowDownload: sharedLink.allowDownload,
    showExif: sharedLink.showExif,
  };
}
