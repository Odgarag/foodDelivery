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

export default function HomePage() {
  const [foods, setFoods] = useState<Record<string, FoodProps[]>>({})

  useEffect(() => {
    const getFoods = async () => {
      const { data } = await axios.get(
        'https://fooddelivery-2r6v.onrender.com/foods'
      )
      setFoods(data.foods)
    }

    getFoods()
  }, [])

  return (
    <div>
      <img src="/BG.png" />

      <Datas foods={foods} />
    </div>
  )
}
