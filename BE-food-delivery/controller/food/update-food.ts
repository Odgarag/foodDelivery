import { Request, Response } from 'express'
import { FoodModel } from '../../model/food.model'

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { foodName, price, image, ingredients, category } = req.body

    const food = await FoodModel.findById(id)
    if (!food) {
      res.status(404).send({ message: 'Хоол олдсонгүй' })
      return
    }

    food.foodName = foodName ?? food.foodName
    food.price = price ?? food.price
    food.image = image ?? food.image
    food.ingredients = ingredients ?? food.ingredients
    food.category = category ?? food.category

    await food.save()

    res.send({ message: 'Хоол амжилттай шинэчлэгдлээ' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Хоол шинэчлэх үед алдаа гарлаа' })
  }
}
