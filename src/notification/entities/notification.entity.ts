import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type NotificationDocument = NotificationModel & Document

@Schema({ timestamps: true, optimisticConcurrency: true })
export class NotificationModel {
  @Prop({ type: String })
  title: string

  @Prop({ type: String })
  thumbnail: string

  @Prop({ type: String })
  topic_name: string

  @Prop({ type: String })
  description: string

  @Prop({ type: String, required: false })
  clickAction: string
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationModel)
