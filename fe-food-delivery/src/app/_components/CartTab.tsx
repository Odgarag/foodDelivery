import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { X } from 'lucide-react'
import { CartItem } from './types'

type CartTabProps = {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  address: string
  handleCheckout: () => void
}

const CartTab: React.FC<CartTabProps> = ({
  cart,
  setCart,
  address,
  handleCheckout,
}) => {
  const updateQuantity = (_id: string, amount: number) => {
    const updated = cart.map((item) =>
      item._id === _id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    )
    localStorage.setItem('cart', JSON.stringify(updated))
    setCart(updated)
  }

  const removeItem = (_id: string) => {
    const updated = cart.filter((item) => item._id !== _id)
    localStorage.setItem('cart', JSON.stringify(updated))
    setCart(updated)
  }

  const itemTotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)
  const shipping = 5000.0
  const grandTotal = (parseFloat(itemTotal) + shipping).toFixed(2)

  return (
    <>
      <div className="mt-6 bg-white p-4 rounded-2xl space-y-4">
        <p className="font-semibold text-gray-900">My cart</p>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 border-b pb-3"
            >
              <Image
                src={item.image}
                alt={item.foodName}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-red-500 text-sm">
                  {item.foodName}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {item.ingredients}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item._id, -1)}
                      className="rounded-full px-2"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item._id, 1)}
                      className="rounded-full px-2"
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm font-semibold">
                    ₮{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeItem(item._id)}
              >
                <X size={16} className="text-gray-400" />
              </Button>
            </div>
          ))
        )}

        <div className="bg-white p-2 mt-4 rounded-2xl">
          <p className="font-semibold text-gray-800">Delivery location</p>
          <div className="text-sm text-gray-500 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md min-h-[48px] flex items-center">
            {address || 'Please share your complete address'}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 mt-4 rounded-2xl">
        <p className="font-semibold text-gray-800 mb-2">Payment info</p>
        <div className="flex justify-between text-sm mb-1">
          <span>Items</span>
          <span>₮{itemTotal}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Shipping</span>
          <span>₮{shipping.toFixed(2)}</span>
        </div>
        <div className="border-t border-dashed my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₮{grandTotal}</span>
        </div>
      </div>

      <Button
        className="w-full mt-4 bg-red-500 text-white rounded-full py-3 text-sm font-semibold"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </>
  )
}

export default CartTab
