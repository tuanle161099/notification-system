import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common'
import { Auth } from 'src/decorator/auth.decorator'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { UserProfile } from './type'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Auth() user: UserProfile) {
    console.log(user)
    return { msg: 'hello word' }
  }
}
