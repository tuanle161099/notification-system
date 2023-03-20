import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UsersDocument = UsersModel & Document

@Schema({ timestamps: true, optimisticConcurrency: true })
export class UsersModel {
  @Prop({ type: String })
  username: string

  @Prop({ type: String })
  password: string

  @Prop({ type: String })
  email: string

  @Prop({ type: String })
  phone: number
}

export const UserSchema = SchemaFactory.createForClass(UsersModel)
