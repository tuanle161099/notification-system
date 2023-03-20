import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    const { user } = request
    return data ? user[`${data}`] : user
  },
)
