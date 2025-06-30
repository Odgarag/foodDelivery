'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

type Order = {
  _id: string
  userEmail: string
  totalPrice: number
  createdAt: string
  address: string
  status: 'PENDING' | 'DELIVERED' | 'CANCELED'
  foodOrderItems: {
    name: string
    quantity: number
    price: number
    image?: string
  }[]
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const res = await axios.get(
          'http://localhost:8000/admin/getAllOrders',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const transformed = res.data.orders.map((order: any) => ({
          ...order,
          foodOrderItems: order.foodOrderItems.map((item: any) => ({
            name: item.food?.foodName,
            price: item.food?.price,
            image: item.food?.image,
            quantity: item.quantity,
          })),
        }))

        setOrders(transformed)
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      }
    }

    fetchOrders()
  }, [])

  const handleStatusChange = async (id: string, status: Order['status']) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Log in hiine uu')
        return
      }
      const updateOrders = [{ orderId: id, status: status }]
      await axios.put(
        `http://localhost:8000/admin/order/update`,
        {
          orders: updateOrders,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? { ...order, status } : order))
      )
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const getBadgeStyle = (status: string | undefined) => {
    switch (status) {
      case 'DELIVERED':
        return
      case 'CANCELED':
        return
      case 'PENDING':
        return
      default:
        return
    }
  }

  return (
    <div className="p-6 w-screen max-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]">#</TableHead>
            <TableHead className="w-[15%]">Customer</TableHead>
            <TableHead className="w-[15%]">Food</TableHead>
            <TableHead className="w-[15%]">Date</TableHead>
            <TableHead className="w-[10%]">Total</TableHead>
            <TableHead className="w-[25%]">Delivery Address</TableHead>
            <TableHead className="w-[15%]">Delivery State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, ind) => (
            <TableRow key={order._id}>
              <TableCell>{ind + 1}</TableCell>
              <TableCell>{order.userEmail}</TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-xs px-3 py-1 flex items-center justify-between w-full"
                    >
                      {order.foodOrderItems.length} foods
                      <ChevronDown className="ml-1 w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72">
                    {order.foodOrderItems.map((item, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        className="flex items-center gap-3 py-2"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            x{item.quantity} • ₮
                            {item.price?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>

              <TableCell>
                {format(new Date(order.createdAt), 'yyyy/MM/dd')}
              </TableCell>
              <TableCell>₮{order.totalPrice.toFixed(2)}</TableCell>
              <TableCell className="max-w-xs truncate">
                {order.address}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`text-xs border rounded-full px-3 py-1 capitalize flex items-center gap-1 ${getBadgeStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(
                      ['PENDING', 'DELIVERED', 'CANCELED'] as Order['status'][]
                    ).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => handleStatusChange(order._id, status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersPage
