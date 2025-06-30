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
    const getFoods = async () => {
      const { data } = await axios.get(
        'https://fooddelivery-2r6v.onrender.com/foods'
      )
      const list: FoodProps[] = data.foods

      const grouped: Record<string, FoodProps[]> = {}

      list?.forEach((item) => {
        if (!grouped[item.category]) {
          grouped[item.category] = []
        }
        grouped[item.category].push(item)
      })

      setFoods(grouped)
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
