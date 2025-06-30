import { Request, Response } from 'express'
import { UserModel } from '../../model/user.model'
import bcrypt from 'bcrypt'

export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body

  const isEmailExisted = await UserModel.findOne({ email })

  if (!isEmailExisted) {
    const hashedPassword = await bcrypt.hashSync(password, 10)
    await UserModel.create({ email, password: hashedPassword })

    response.send({ message: 'Successfully registered' })
    return
  }

  response.status(400).send({ message: 'User already existed' })
}
