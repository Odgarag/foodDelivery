import { model, Schema } from 'mongoose'

export enum FoodOrderStatusEnum {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  DELIVERED = 'DELIVERED',
}

const FoodOrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },

  foodOrderItems: [
    {
      food: { type: Schema.Types.ObjectId, ref: 'Foods', required: true },
      quantity: { type: Number, required: true },
    },
  ],

  status: {
    type: String,
    enum: Object.values(FoodOrderStatusEnum),
    required: true,
    default: FoodOrderStatusEnum.PENDING,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const FoodOrderModel = model('FoodOrders', FoodOrderSchema)
