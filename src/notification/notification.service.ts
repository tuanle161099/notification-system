import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api'
import { Model } from 'mongoose'

import { FCMProvider } from 'src/providers/fcm.provider'
import { TopicService } from 'src/topic/topic.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import {
  NotificationDocument,
  NotificationModel,
} from './entities/notification.entity'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationModel.name)
    private notificationModel: Model<NotificationDocument>,
    private topicService: TopicService,
    private fcmProvider: FCMProvider,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userId: string) {
    const { topic_name, title, thumbnail, description } = createNotificationDto
    const name = `${userId}-${topic_name}`

    const isExistedTopic = await this.topicService.isExisted(name)
    if (!isExistedTopic)
      throw new BadRequestException(`No found topic: ${topic_name}`)

    const messagePayload: MessagingPayload = {
      notification: {
        title,
        body: description,
        icon: thumbnail,
      },
      data: {
        createdAt: new Date().toString(),
      },
    }
    // Push to FCM
    await this.fcmProvider.sendToTopic(name, messagePayload)

    return await new this.notificationModel({
      ...createNotificationDto,
      topic_name: name,
    }).save()
  }

  async findAll(topicName: string, userId: string) {
    const name = `${userId}-${topicName}`
    return await this.notificationModel.find({ topic_name: name })
  }
}
