import type { EnvVariables } from 'types'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypedConfigService {
  constructor(private configService: ConfigService<EnvVariables>) {}

  get<T extends keyof EnvVariables>(
    key: T,
    options?: { shouldThrow?: boolean }
  ) {
    if (options?.shouldThrow) return this.configService.getOrThrow(key)

    return this.configService.get(key)
  }
}
