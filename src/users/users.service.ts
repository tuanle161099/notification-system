import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersDocument, UsersModel } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel.name)
    private userModel: Model<UsersDocument>,
  ) {}

  async signUp(user: CreateUserDto) {
    const isExisted = await this.userModel.findOne({ username: user.username })
    if (isExisted)
      throw new BadRequestException(`Username: ${user.username} has existed`)

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    return new this.userModel({ ...user, password: hash }).save()
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username })
    if (!user) throw new BadRequestException('User not found!')
    return user
  }
}
