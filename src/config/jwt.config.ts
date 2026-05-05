import type { JwtModuleOptions } from '@nestjs/jwt'
import type { EnvironmentVariables } from './env.config'

import { ConfigService } from '@nestjs/config'

export const getJwtConfig = async (
  configService: ConfigService<EnvironmentVariables>
): Promise<JwtModuleOptions> => ({
  publicKey: configService.get('JWT_PUBLIC_KEY'),
  privateKey: configService.get('JWT_PRIVATE_KEY'),
  signOptions: { algorithm: 'RS256' }
})
