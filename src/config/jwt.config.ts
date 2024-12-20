import type { JwtModuleOptions } from '@nestjs/jwt'

import { TypedConfigService } from 'typed-config-service'

export const getJwtConfig = async (
  configService: TypedConfigService
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET')
})
