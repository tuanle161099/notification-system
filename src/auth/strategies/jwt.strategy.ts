import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UserProfile } from '../type'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from 'src/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService<EnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secret', { infer: true }),
    })
  }

  async validate(payload: UserProfile) {
    return payload
  }
}
