export type CartItem = {
  _id: string
  foodName: string
  price: number
  quantity: number
  image: string
  ingredients: string
}

export type Order = {
  _id: string
  totalPrice: number
  address: string
  status: string
  createdAt: string
  foodOrderItems: {
    _id: string
    quantity: number
    food: {
      _id: string
      foodName: string
      image: string
    }
  }[]
}
