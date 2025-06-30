import { Request, Response } from 'express'
import { FoodModel } from '../../model/food.model'

export const addFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const { foodName, price, image, ingredients, category } = req.body

    if (!foodName || !price || !image || !ingredients || !category) {
      res.status(400).json({ message: 'Бүх талбар шаардлагатай' })
      return
    }

    await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    })

    res.send({ message: 'Хоол амжилттай нэмэгдлээ' })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      message: 'Хоол нэмэх үед алдаа гарлаа',
    })
  }
}
