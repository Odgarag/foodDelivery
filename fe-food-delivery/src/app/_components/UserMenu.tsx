'use client'

import { useState, useRef, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-sm hover:opacity-90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUser className="text-white" size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 text-black z-50">
          <p className="font-semibold text-sm mb-2">Test@gmail.com</p>
          <button className="text-sm text-red-500 hover:underline">
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
