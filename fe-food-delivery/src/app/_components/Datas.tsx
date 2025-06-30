'use client'

import { useState } from 'react'
import FoodCard from './FoodCard'
import FoodDialog from './FoodDialog'
import { PropsType, FoodProps } from './FoodTypes'

export const Datas = ({ foods }: PropsType) => {
  const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null)
  const keys = Object.keys(foods)

  // const list: FoodProps[] = foods

  // const grouped: Record<string, FoodProps[]> = {}

  // list?.forEach((item) => {
  //   if (!grouped[item.category]) {
  //     grouped[item.category] = []
  //   }
  //   grouped[item.category].push(item)
  // })

  console.log(foods, 'foodsfoods')

  return (
    <div className="bg-gray-700 py-16">
      <div className="flex flex-col gap-20 w-[85%] m-auto">
        {keys.map((category) => (
          <div key={category}>
            <h2 className="text-3xl font-bold text-white mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods[category]?.slice(0, 6).map((food) => (
                <FoodCard
                  key={food._id}
                  food={food}
                  onSelect={setSelectedFood}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <FoodDialog
        selectedFood={selectedFood}
        setSelectedFood={setSelectedFood}
      />
    </div>
  )
}
