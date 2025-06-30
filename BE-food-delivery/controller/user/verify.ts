import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verify = async (request: Request, response: Response) => {
  const auth = request.headers.authorization
  const tokenPassword = 'foodDelivery'

  if (!auth) {
    response.status(401).send({ message: 'Token is not valid' })
    return
  }

  const token = auth.split(' ')[1]

  try {
    const isValid = jwt.verify(token, tokenPassword)
    if (isValid) {
      const destructToken: any = jwt.decode(token)
      response.send({ destructToken })
      return
    } else {
      response.status(401).send({ message: 'Token is not valid' })
      return
    }
  } catch (err) {
    response.status(401).send({ message: 'Token is not' })
  }
}
