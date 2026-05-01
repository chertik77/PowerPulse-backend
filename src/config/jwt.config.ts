import type { JwtModuleOptions } from '@nestjs/jwt'
import type { EnvironmentVariables } from './env.config'

import { ConfigService } from '@nestjs/config'

export const getJwtConfig = async (
  configService: ConfigService<EnvironmentVariables>
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET')
})
