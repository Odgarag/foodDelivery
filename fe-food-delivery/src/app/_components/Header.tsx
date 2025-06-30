'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { DeliveryDialog } from './DeliveryDialog'
import SheetComponent from './SheetComponent'
import UserMenu from './UserMenu'

export const Header = () => {
  const arr = ['/login', '/signup', '/admin/orders', '/admin/addFoods']
  const path = usePathname()

  if (arr.includes(path)) {
    return null
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#161618] text-white">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="logo" width={36} height={36} />
        <div>
          <h1 className="font-bold text-lg">
            <span className="text-white">Nom</span>
            <span className="text-red-500">Nom</span>
          </h1>
          <p className="text-xs text-gray-400">Swift delivery</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DeliveryDialog />

        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:opacity-90">
          <SheetComponent />
        </div>

        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-sm hover:opacity-90">
          <UserMenu />{' '}
        </div>
      </div>
    </header>
  )
}
