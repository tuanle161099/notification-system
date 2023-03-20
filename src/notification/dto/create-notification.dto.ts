import { IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsUrl()
  thumbnail: string

  @IsString()
  topic_name: string

  @IsString()
  @IsOptional()
  clickAction: string
}
