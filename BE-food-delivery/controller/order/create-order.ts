import { Request, Response } from 'express'
import { FoodOrderModel } from '../../model/food.order.model'

export const CreateOrder = async (request: Request, response: Response) => {
  const { totalPrice, foodOrderItems, address } = request.body
  const { userId } = response.locals

  try {
    await FoodOrderModel.create({
      user: userId,
      totalPrice,
      foodOrderItems,
      address: address,
    })
    response.status(200).send({ message: 'Successfully created order' })
    return
  } catch (error) {
    response.status(400).send({ message: ' Can not created order' })
    return
  }
}
