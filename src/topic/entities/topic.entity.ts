import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TopicDocument = TopicModel & Document

@Schema({ timestamps: true, optimisticConcurrency: true })
export class TopicModel {
  @Prop({ type: String })
  name: string

  @Prop({ type: String })
  owner: string
}

export const TopicSchema = SchemaFactory.createForClass(TopicModel)
