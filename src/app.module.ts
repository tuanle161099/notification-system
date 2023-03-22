import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'

import { NotificationModule } from './notification/notification.module'
import { TopicModule } from './topic/topic.module'
import { UsersModule } from './users/users.module'
import { FCMProvider } from './providers/fcm.provider'

import configuration, { EnvironmentVariables } from './config'
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
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        return {
          uri: configService.get('mongodb').uri,
        }
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        ttl: configService.get('throttle').ttl,
        limit: configService.get('throttle').limit,
      }),
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
