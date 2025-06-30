'use client'

import { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FiShoppingCart } from 'react-icons/fi'
import CartTab from './CartTab'
import OrderTab from './OrderTab'
import TabSwitcher from './TabSwitcher'
import type { CartItem, Order } from './types'
import SuccessModal from './SuccessModal'
import axios from 'axios'

const SheetComponent = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [address, setAddress] = useState<string>('')
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<'cart' | 'order'>('cart')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const getCartData = () => {
      try {
        const storedCart: CartItem[] = JSON.parse(
          localStorage.getItem('cart') || '[]'
        )
        setCart(storedCart)

        const totalCount = storedCart.reduce(
          (acc: number, item: CartItem) => acc + item.quantity,
          0
        )
        setCartCount(totalCount)
      } catch (err) {
        console.error('Failed to parse cart data:', err)
      }
    }

    getCartData()
    window.addEventListener('cart-updated', getCartData)
    return () => window.removeEventListener('cart-updated', getCartData)
  }, [])

  useEffect(() => {
    const savedAddress = localStorage.getItem('deliveryAddress')
    if (savedAddress) setAddress(savedAddress)

    fetchOrders()
  }, [showSuccess])

  const fetchOrders = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.get(
        'https://fooddelivery-2r6v.onrender.com/getOrdersByUserId',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Fetched orders:', response.data)
      setOrders(response.data.orders || [])
    } catch (error: any) {
      console.error(
        'Failed to fetch orders:',
        error.response?.data || error.message
      )
    }
  }

  const handleCheckout = async () => {
    if (!cart.length) {
      alert('Your cart is empty.')
      return
    }

    const itemTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
    const shipping = 5000.0
    const grandTotal = parseFloat((itemTotal + shipping).toFixed(2))

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login again')
      return
    }

    const foodOrderItems = cart.map((item) => ({
      food: item._id,
      quantity: item.quantity,
    }))

    try {
      const res = await axios.post(
        'https://fooddelivery-2r6v.onrender.com/createOrder',
        {
          totalPrice: grandTotal,
          foodOrderItems,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Order created:', res.data)
      localStorage.setItem('cart', '[]')
      setCart([])
      setCartCount(0)
      setShowSuccess(true)
      setActiveTab('order')
    } catch (error: any) {
      // console.error('Checkout failed:', error.response?.data || error.message)
    }
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:opacity-90 cursor-pointer">
            <FiShoppingCart className="text-black" size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[500px] bg-[#2e2e2e] px-4 py-4 overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white text-lg">
              <FiShoppingCart />
              Order detail
            </SheetTitle>
          </SheetHeader>

          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'cart' ? (
            <CartTab
              cart={cart}
              setCart={setCart}
              address={address}
              handleCheckout={handleCheckout}
            />
          ) : (
            <OrderTab orders={orders} />
          )}
        </SheetContent>
      </Sheet>

      <SuccessModal show={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  )
}

export default SheetComponent
