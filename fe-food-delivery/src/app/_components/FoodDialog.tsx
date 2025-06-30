'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FoodProps } from './FoodTypes'
import { useEffect, useState } from 'react'

type FoodDialogProps = {
  selectedFood: FoodProps | null
  setSelectedFood: (food: FoodProps | null) => void
}

const FoodDialog = ({ selectedFood, setSelectedFood }: FoodDialogProps) => {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (selectedFood) setQuantity(1)
  }, [selectedFood])

  const total = selectedFood
    ? (Number(selectedFood.price) * quantity).toFixed(2)
    : '0.00'

  const handleAddToCart = () => {
    if (!selectedFood) return

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const index = existingCart.findIndex(
      (item: any) => item._id === selectedFood._id
    )

    if (index !== -1) {
      existingCart[index].quantity += quantity
    } else {
      existingCart.push({ ...selectedFood, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(existingCart))
    setSelectedFood(null)
    window.dispatchEvent(new Event('cart-updated'))
  }

  return (
    <Dialog open={!!selectedFood} onOpenChange={() => setSelectedFood(null)}>
      <DialogContent className="!w-fit !max-w-[700px] h-[300px]">
        {selectedFood && (
          <div className="flex gap-6 w-fit">
            <img
              src={selectedFood.image}
              alt={selectedFood.foodName}
              className="w-[50%] h-auto rounded-lg object-cover"
            />

            <div className="flex flex-col justify-between w-full">
              <DialogHeader>
                <DialogTitle className="text-2xl text-red-600">
                  {selectedFood.foodName}
                </DialogTitle>
                <DialogDescription>
                  {selectedFood.ingredients}
                </DialogDescription>
              </DialogHeader>

              <div>
                <div className="flex gap-6 mt-4">
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-xl font-bold">₮{total}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() =>
                            setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                          }
                        >
                          -
                        </Button>
                        <span className="font-medium">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => setQuantity((prev) => prev + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="mt-4 w-full" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FoodDialog
