'use client'

import { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'

type Props = {
  onClose: () => void
  onSuccess: () => void
}

const AddCategoryModal = ({ onClose, onSuccess }: Props) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) return alert('Category name is required.')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Login required')
        return
      }

      setLoading(true)

      await axios.post(
        'http://localhost:8000/addCategory',
        { categoryName: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Failed to add category:', error)
      alert('Something went wrong while adding category.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-6 relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X />
        </button>
        <h3 className="text-lg font-semibold mb-4">Add new category</h3>
        <input
          type="text"
          placeholder="Type category name..."
          className="border rounded px-3 py-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white w-full py-2 rounded"
        >
          {loading ? 'Adding...' : 'Add category'}
        </button>
      </div>
    </div>
  )
}

export default AddCategoryModal
