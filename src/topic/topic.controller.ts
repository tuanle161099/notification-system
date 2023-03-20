import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { TopicService } from './topic.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { Auth } from 'src/decorator/auth.decorator'

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Auth('id') userId: string, @Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto, userId)
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  subscribeTopic(
    @Auth('id') userId: string,
    @Body() { token, topic_name }: { token: string; topic_name: string },
  ) {
    return this.topicService.subscribeTopic(token, topic_name, userId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Auth('id') userId: string) {
    return this.topicService.findAll(userId)
  }
}
