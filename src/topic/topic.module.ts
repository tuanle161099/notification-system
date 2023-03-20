import { Module } from '@nestjs/common'
import { TopicService } from './topic.service'
import { TopicController } from './topic.controller'
import { TopicModel, TopicSchema } from './entities/topic.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopicModel.name, schema: TopicSchema }]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
