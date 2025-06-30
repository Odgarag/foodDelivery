import { Router } from 'express'
import { tokenChecker } from '../middleware/token-checker'
import { CreateOrder } from '../controller/order/create-order'
import { GetOrdersByUSersId } from '../controller/order/get-orders-by-userId'

export const OrderRouter = Router()

OrderRouter.post('/createOrder', tokenChecker, CreateOrder)
OrderRouter.get('/getOrdersByUserId', tokenChecker, GetOrdersByUSersId)
