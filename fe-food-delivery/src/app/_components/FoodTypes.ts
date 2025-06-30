export type FoodProps = {
  foodName: string
  image: string
  ingredients: string
  price: number
  _id: string
}

export type PropsType = {
  foods: Record<string, FoodProps[]>
}
