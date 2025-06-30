import { model, Schema } from 'mongoose'

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  _id: string
  email: string
  password: string
  phoneNumber?: string
  address?: string
  role?: UserRoleEnum
  isVerified?: boolean
  createdAt: Date
  updatedAt: Date
}

const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    required: false,
    default: 'USER',
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
})

Users.index({ email: 1 }, { unique: true })

export const UserModel = model('Users', Users)
