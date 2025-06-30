import { Request, Response } from 'express'
import { FoodOrderModel } from '../../model/food.order.model'

export const GetOrdersByUSersId = async (
  request: Request,
  response: Response
) => {
  const { userId } = response.locals
  try {
    const allGetOrdersByUSersId = await FoodOrderModel.find({
      user: userId,
    })
      .populate({
        path: 'foodOrderItems',
        populate: {
          path: 'food',
          model: 'Foods',
        },
      })
      .sort({ createdAt: -1 })

    response.status(200).send({ orders: allGetOrdersByUSersId })
  } catch (error) {
    response.status(400).send({ message: 'Can not get orders' })
  }
}
