import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common'

import { NotificationService } from './notification.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard'
import { Auth } from 'src/decorator/auth.decorator'

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Auth('id') userId: string,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.create(createNotificationDto, userId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Auth('id') userId: string, @Query('topic_name') topic_name: string) {
    return this.notificationService.findAll(topic_name, userId)
  }
}
