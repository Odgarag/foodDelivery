import { Request, Response } from 'express'
import { FoodOrderModel } from '../../model/food.order.model'

export const updateOrderStatus = async (
  request: Request,
  response: Response
) => {
  const { orders } = request.body

  await Promise.all(
    orders.map(async (order: Record<string, string>) => {
      return await FoodOrderModel.findByIdAndUpdate(
        { _id: order.orderId },
        { status: order.status },
        { new: true }
      )
    })
  )
  response.status(200).send({ message: 'success' })
}
