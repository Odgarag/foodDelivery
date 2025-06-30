'use client'

import { Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Marquee } from './Marquee'
import axios from 'axios'

type Category = {
  categoryName: string
  _id: string
}
export const Footer = () => {
  const arr = ['/login', '/signup', '/admin/orders', '/admin/addFoods']
  const path = usePathname()

  if (arr.includes(path)) {
    return null
  }
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(
        'https://fooddelivery-2r6v.onrender.com/allCategories'
      )
      setCategories(data.categories)
    }
    getCategories()
  }, [])

  return (
    <footer className="bg-gray-900 text-white pt-[60px]">
      <div className="bg-red-500 text-white py-3 text-center text-lg font-semibold flex justify-around flex-wrap h-[92px]">
        <Marquee text="Fresh fast delivered" speed={15} />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
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

        <div>
          <h4 className="text-gray-400 uppercase text-sm font-semibold mb-4">
            NomNom
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Delivery zone</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-400 uppercase text-sm font-semibold mb-4">
            Menu
          </h4>
          {categories?.map((el) => (
            <div key={el._id}>
              <a className="space-y-2 text-sm text-gray-300">
                {el.categoryName}
              </a>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-gray-400 uppercase text-sm font-semibold mb-4">
            Follow us
          </h4>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 text-sm text-gray-500 py-4 px-27 flex justify-between items-center pb-[111px]">
        <div className="space-x-4">
          <a>Copy right 2024 © Nomnom LLC</a>
          <a href="#" className="hover:text-white">
            Privacy policy
          </a>
          <a href="#" className="hover:text-white">
            Terms and conditoin
          </a>
          <a href="#" className="hover:text-white">
            Cookie policy
          </a>
        </div>
      </div>
    </footer>
  )
}
