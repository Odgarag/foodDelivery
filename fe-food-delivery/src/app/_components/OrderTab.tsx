import React from 'react'
import type { Order } from './types'

type OrderTabProps = {
  orders: Order[]
}

const OrderTab: React.FC<OrderTabProps> = ({ orders }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded-2xl space-y-4">
      <p className="font-semibold text-gray-900">Order history</p>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border-b border-dashed pb-4 space-y-1"
          >
            <div className="flex justify-between text-sm font-semibold">
              <span>
                ₮{order.totalPrice.toFixed(2)} (#₮{order._id.slice(-4)})
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full border ${
                  order.status === 'CANCELED'
                    ? 'border-red-400 text-red-400'
                    : 'border-green-500 text-green-500'
                }`}
              >
                {order.status}
              </span>
            </div>
            {order.foodOrderItems.map((item) => (
              <div key={item._id} className="text-xs text-gray-600 ml-2">
                {item.food?.foodName ?? 'No name'} × {item.quantity}
              </div>
            ))}
            <div className="text-xs text-gray-400 ml-2">
              📅 {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-400 ml-2 truncate">
              📍 {order.address}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderTab
