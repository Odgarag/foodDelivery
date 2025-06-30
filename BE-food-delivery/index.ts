import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { UserRouter } from './router/user.route'
import { CategoryRouter } from './router/category.route'
import { FoodRouter } from './router/food.route'
import { OrderRouter } from './router/order.route'
import { AdminRouter } from './router/admin.route'

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://odgaragodko:RLXiB9z6goPwgxmW@fooddelivery.gxj6jcd.mongodb.net/foodDelivery'
    )
    console.log('Successfully')
  } catch (err) {
    console.log(err)
  }
}

const app = express()
app.use(express.json())
app.use(cors())
databaseConnect()
app.use(UserRouter)
app.use(CategoryRouter)
app.use(FoodRouter)
app.use(OrderRouter)
app.use(AdminRouter)

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`)
})
// whpebfcvlmipeybr
// app.get('/sendOtp', async (request: Request, response: Response) => {
//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'odgarag.odko@gmail.com',
//       pass: 'whpebfcvlmipeybr',
//     },
//   })
//   const options = {
//     from: 'odgarag.odko@gmail.com',
//     to: request.body,
//     subject: 'hello',
//     html: `<div style="color:red"> $(code) </div>`,
//   }
//   await transport.sendMail(options)
//   response.send('success')
// })
