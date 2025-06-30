'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, Truck } from 'lucide-react'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="w-64 min-h-screen bg-white border-r px-6 py-8 flex flex-col">
      <div className="flex items-center space-x-2 mb-12">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <div>
          <h1 className="font-bold text-lg">NomNom</h1>
          <p className="text-sm text-gray-400 -mt-1">Swift delivery</p>
        </div>
      </div>

      <nav className="flex flex-col space-y-4">
        <Link
          href="/admin/addFoods"
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition ${
            pathname === '/admin/foods'
              ? 'bg-black text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4 mr-2" />
          Food menu
        </Link>

        <Link
          href="/admin/orders"
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition ${
            pathname === '/admin/orders'
              ? 'bg-black text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Truck className="w-4 h-4 mr-2" />
          Orders
        </Link>
      </nav>

      <div className="flex-grow" />
    </div>
  )
}

export default Sidebar
