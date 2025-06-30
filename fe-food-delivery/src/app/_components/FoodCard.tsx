'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FoodProps } from './FoodTypes'

interface FoodCardProps {
  food: FoodProps
  onSelect: (food: FoodProps) => void
}

const FoodCard = ({ food, onSelect }: FoodCardProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-xl">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-[90%] m-auto h-full object-cover rounded-[15px]"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect(food)}
          className="absolute bottom-4 right-8 bg-white hover:bg-opacity-90 text-red-600 rounded-full"
        >
          +
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-red-600 text-xl">{food.foodName}</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-700 text-sm">
        <p>{food.ingredients}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-lg">₮{food.price}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default FoodCard
