import * as bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) throw new UnauthorizedException('Password not match!')
    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password)
    if (!user) throw new UnauthorizedException()
    const payload = { username: user.username, id: user._id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
