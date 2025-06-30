import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type SuccessModalProps = {
  show: boolean
  onClose: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
  if (!show) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl text-center w-[420px] shadow-lg justify-center">
        <p className="text-lg font-semibold mb-4 text-black">
          Your order has been successfully placed !{' '}
        </p>
        <Image
          src={'/illustration.png'}
          alt="zurag"
          width={156}
          height={266}
          className="m-auto"
        />
        <Button
          className="rounded-full px-4 bg-red-500 text-white"
          onClick={onClose}
        >
          Back to home
        </Button>
      </div>
    </div>
  )
}

export default SuccessModal
