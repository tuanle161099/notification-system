import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FCMProvider } from 'src/providers/fcm.provider'

import { CreateTopicDto } from './dto/create-topic.dto'
import { TopicDocument, TopicModel } from './entities/topic.entity'

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(TopicModel.name)
    private topicModel: Model<TopicDocument>,
    private fcmProvider: FCMProvider,
  ) {}

  async isExisted(topicName: string) {
    const topic = await this.topicModel.findOne({ name: topicName })
    return !!topic
  }

  async create(createTopicDto: CreateTopicDto, userId: string) {
    const name = `${userId}-${createTopicDto.name}`
    const nameExisted = await this.isExisted(name)
    if (nameExisted)
      throw new BadRequestException('Your topic name has existed!')

    return await new this.topicModel({ name, owner: userId }).save()
  }

  async findAll(userId: string) {
    return (await this.topicModel.find({ owner: userId })).map((topic) => ({
      ...topic,
      name: topic.name.replace(`${userId}-`, ''),
    }))
  }

  async subscribeTopic(token: string, topic_name: string, userId: string) {
    const name = `${userId}-${topic_name}`
    const isExistedTopic = await this.isExisted(name)
    if (!isExistedTopic)
      throw new BadRequestException(`No found topic: ${topic_name}`)

    await this.fcmProvider.subscribeToTopic(token, name)

    return {
      message: `You have successfully registered the topic ${topic_name}`,
    }
  }
}
