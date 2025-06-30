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
    axios
      .get('https://fooddelivery-2r6v.onrender.com/foods')
      .then((res) => {
        const list: FoodProps[] = res.data.foods

        const grouped: Record<string, FoodProps[]> = {}

        list.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = []
          }
          grouped[item.category].push(item)
        })

        setFoods(grouped)
      })
      .catch((err) => {
        console.error('Failed to fetch foods:', err)
      })
  }, [])

  return (
    <div>
      <img src="/BG.png" />
      <Datas foods={foods} />
    </div>
  )
}
