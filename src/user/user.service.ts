import { Injectable } from '@nestjs/common'

import { hash } from 'argon2'
import { PrismaService } from 'prisma/prisma.service'

import { SignupDto } from 'auth/dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findFirst({
      where: { id },
      omit: { password: true }
    })
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async createNewUser(dto: SignupDto) {
    return await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password)
      },
      omit: { password: true }
    })
  }
}
