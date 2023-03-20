import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuration, { EnvironmentVariables } from './config'

import { NotificationModule } from './notification/notification.module'
import { FCMProvider } from './providers/fcm.provider'
import { TopicModule } from './topic/topic.module'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  providers: [FCMProvider],
  exports: [FCMProvider],
  imports: [UsersModule],
})
export class GlobalModule {}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        return {
          uri: configService.get('mongodb').uri,
        }
      },
      inject: [ConfigService],
    }),
    GlobalModule,
    AuthModule,
    NotificationModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
