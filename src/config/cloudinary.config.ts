import type { EnvironmentVariables } from './env.config'

import { ConfigService } from '@nestjs/config'

import { v2 } from 'cloudinary'

export const getCloudinaryConfig = async (
  configService: ConfigService<EnvironmentVariables>
) => {
  v2.config({
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_API_SECRET')
  })
}
