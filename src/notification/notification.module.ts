import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { MongooseModule } from '@nestjs/mongoose'
import {
  NotificationModel,
  NotificationSchema,
} from './entities/notification.entity'
import { TopicModule } from 'src/topic/topic.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationModel.name, schema: NotificationSchema },
    ]),
    TopicModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
