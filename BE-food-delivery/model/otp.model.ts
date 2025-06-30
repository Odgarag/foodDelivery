import { model, Schema } from 'mongoose'
import { User } from './user.model'

export type Otp = {
  _id: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  code: string
  createdAt: Date
}

export type OtpPopulated = {
  userId: User
}

const Otp = new Schema({
  code: { type: String, require: true },
  userId: { type: Schema.ObjectId, require: true, ref: 'Users' },

  createdAt: { type: String, default: Date.now, expires: 180 },
})

export const OtpModel = model('Otps', Otp)
