import { createMiddleware } from '@tanstack/react-start'

export const guardMiddleware = createMiddleware().server(
  ({ next, context, request }) => {
    console.log('guardMiddleware', context)
    console.log('guardMiddlewareRequest', request)
    return next()
  },
)