'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'

export const DeliveryDialog = () => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('deliveryAddress')
    if (saved) {
      setAddress(saved)
      setInput(saved)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('deliveryAddress', input)
    setAddress(input)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-1 text-sm bg-white text-red-500 px-4 py-1.5 rounded-full shadow-sm hover:opacity-90">
          <FaLocationDot className="text-red-500" />
          <span className="font-semibold">Delivery address:</span>
          <span className="text-black font-normal">
            {address ? address : 'Add Location'}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="h-[250px]">
        <DialogHeader>
          <DialogTitle>Please write your delivery address!</DialogTitle>
          <DialogDescription>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Please share your complete address"
              className="w-full mt-4 p-2 border rounded"
            />
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Deliver Here</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
