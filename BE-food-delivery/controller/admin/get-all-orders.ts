import { Request, Response } from 'express'
import { FoodOrderModel } from '../../model/food.order.model'

export const GetAllOrders = async (request: Request, response: Response) => {
  const allOrders = await FoodOrderModel.find().populate({
    path: 'foodOrderItems',
    populate: {
      path: 'food',
      model: 'Foods',
    },
  })
  response.status(200).send({ orders: allOrders })
  return
}
