import { Request, Response } from 'express'
import { UserModel } from '../../model/user.model'
import nodemailer from 'nodemailer'
import { OtpModel, OtpPopulated } from '../../model/otp.model'
import bcrypt from 'bcrypt'

export const sendOtp = async (request: Request, response: Response) => {
  const { email } = request.body

  const isExistingUser = await UserModel.findOne({ email })

  if (!isExistingUser) {
    response.status(404).send({ message: 'User not found.' })
    return
  }

  const code = 1234
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'odgarag.odko@gmail.com',
      pass: 'whpebfcvlmipeybr',
    },
  })
  const options = {
    from: 'odgarag.odko@gmail.com',
    to: request.body.email,
    subject: 'Your OTP code.',
    html: `<div style="color:red">${code}</div>`,
  }

  await OtpModel.create({ code: code, userId: isExistingUser._id })

  await transport.sendMail(options)
  response.send({ message: 'OTP sent' })
}

export const checkOtp = async (request: Request, response: Response) => {
  const { code, email } = request.body
  try {
    const isExistingUser = await OtpModel.findOne({
      code: code,
    }).populate<OtpPopulated>('userId')

    if (!isExistingUser) {
      response.status(400).send('wrong code')
      return
    }
    if (email === isExistingUser?.userId?.email) {
      response.status(200).send({ message: 'success' })
      return
    }
    response.status(400).send('Wrong code')
    return
  } catch (error) {
    response.status(400).send('Wrong OTP')
  }
}

export const updatedPassword = async (request: Request, response: Response) => {
  const { email, password } = request.body
  const isExistingUser = await UserModel.findOne({ email })
  if (!isExistingUser) {
    response.status(400).send({ message: 'User not found' })
    return
  }
  const hashed = await bcrypt.hash(password, 10)

  await UserModel.updateOne({ _id: isExistingUser._id }, { password: hashed })
  response.send({ message: 'Password updated' })
}
