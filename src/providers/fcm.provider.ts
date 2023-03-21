import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api'

@Injectable()
export class FCMProvider {
  private _messaging = admin.messaging()

  async sendToTopic(topic: string, message: MessagingPayload) {
    const data = await this._messaging.sendToTopic(topic, message)
    return data
  }

  async sendToDevice(token: string | string[], message: MessagingPayload) {
    const data = await this._messaging.sendToDevice(token, message)
    return data
  }

  async subscribeToTopic(token: string, topic: string) {
    const data = await this._messaging.subscribeToTopic(token, topic)
    return data
  }
}
