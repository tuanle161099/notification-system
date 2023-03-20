import { NestFactory } from '@nestjs/core'
import { ServiceAccount } from 'firebase-admin'
import * as admin from 'firebase-admin'

import { AppModule } from './app.module'

/** Firebase admin config */
const service_accounts: ServiceAccount = {
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  projectId: process.env.PROJECT_ID,
}

async function bootstrap() {
  /** Init Firebase admin */
  admin.initializeApp({
    credential: admin.credential.cert(service_accounts),
  })

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [/^(http)[s]?:\/\/(localhost)(:[0-9]+)$/],
    credentials: true,
  })

  await app.listen(9999)
}

bootstrap()
