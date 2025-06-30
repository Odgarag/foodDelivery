'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Datas } from './_components/Datas'

type FoodProps = {
  _id: string
  foodName: string
  image: string
  price: number
  ingredients: string
  category: string
}

export default function Home() {
  const [foods, setFoods] = useState<Record<string, FoodProps[]>>({})

  useEffect(() => {
    axios.get('https://fooddelivery-2r6v.onrender.com/foods').then((res) => {
      const list: FoodProps[] = res.data.foods
      setFoods
    })
  })

  return (
    <div>
      <img src="/BG.png" />
      <Datas foods={foods} />
    </div>
  )
}
