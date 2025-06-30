import { model, Schema } from 'mongoose'

export type FoodType = {
  _id: Schema.Types.ObjectId
  foodName: string
  price: number
  image: string
  ingredients: string
  category: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'FoodCategories',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

FoodSchema.index({ foodName: 1 }, { unique: true })

export const FoodModel = model<FoodType>('Foods', FoodSchema)
