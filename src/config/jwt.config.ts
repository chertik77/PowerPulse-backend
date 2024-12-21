import type { JwtModuleOptions } from '@nestjs/jwt'
import type { EnvVariables } from 'types'

import { ConfigService } from '@nestjs/config'

export const getJwtConfig = async (
  configService: ConfigService<EnvVariables>
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET')
})
