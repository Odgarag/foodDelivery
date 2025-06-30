'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { X, Trash } from 'lucide-react'

type Food = {
  _id: string
  foodName: string
  image: string
  price: number
  ingredients: string
  category?: string
}

type Props = {
  category: string
  food?: Food | null
  categories: string[]
  onClose: () => void
  onSuccess: () => void
}

const BASE_URL = 'http://localhost:8000'

const AddFoodsModal = ({
  category,
  food,
  categories,
  onClose,
  onSuccess,
}: Props) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [loading, setLoading] = useState(false)

  const isEditMode = !!food

  useEffect(() => {
    if (food) {
      setName(food.foodName)
      setPrice(food.price.toString())
      setIngredients(food.ingredients)
      setImagePreview(food.image)
      setSelectedCategory(food.category || category)
    } else {
      setSelectedCategory(category)
    }
  }, [food, category])

  const handleDelete = async () => {
    if (!food) return
    if (!confirm('Are you sure you want to delete this dish?')) return

    const token = localStorage.getItem('token')
    if (!token) return alert('Login required')

    setLoading(true)
    try {
      await axios.delete(`${BASE_URL}/foods/${food._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      console.error(' Failed to delete food:', err.response?.data || err)
      alert('Failed to delete the dish.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim() || !price || Number(price) <= 0) {
      return alert('Please enter valid name and price.')
    }

    const token = localStorage.getItem('token')
    if (!token) return alert('Login required')

    setLoading(true)

    try {
      if (isEditMode) {
        const formData = new FormData()
        formData.append('foodName', name)
        formData.append('price', price)
        formData.append('ingredients', ingredients)
        formData.append('category', selectedCategory)

        if (imageFile) {
          formData.append('image', imageFile)
        } else {
          formData.append('image', imagePreview)
        }

        await axios.put(`${BASE_URL}/foods/${food._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } else {
        if (!imageFile) return alert('Please upload an image.')

        const formData = new FormData()
        formData.append('foodName', name)
        formData.append('price', price)
        formData.append('ingredients', ingredients)
        formData.append('category', selectedCategory)
        formData.append('image', imageFile)

        await axios.post(`${BASE_URL}/addFood`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error(
          ' Failed to save food:',
          err.response?.data || err.message || err
        )
        alert(
          err.response?.data?.message ||
            err.message ||
            'Something went wrong. Please try again.'
        )
      } else {
        console.error(' Unexpected error:', err)
        alert('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {isEditMode ? 'Edit Dish' : `Add new Dish to ${category}`}
        </h3>

        <div className="flex flex-col gap-3 mb-3">
          <input
            type="text"
            placeholder="Dish name"
            className="border rounded px-3 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-1 w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Ingredients"
            className="border rounded px-3 py-2 w-full"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border rounded px-3 py-1 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="border-dashed border-2 p-4 rounded text-center mb-4 relative">
          {imagePreview && (
            <div className="relative mb-2">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded"
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                onClick={() => {
                  setImageFile(null)
                  setImagePreview('')
                }}
                aria-label="Remove image"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImageFile(file)
                setImagePreview(URL.createObjectURL(file))
              }
            }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {imageFile?.name ||
              (imagePreview ? 'Image selected' : 'Choose a file')}
          </p>
        </div>

        <div className="flex justify-between items-center">
          {isEditMode && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-red-600 border border-red-600 rounded px-4 py-2 hover:bg-red-100 transition"
            >
              <Trash size={16} />
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white rounded px-6 py-2"
          >
            {loading
              ? isEditMode
                ? 'Saving...'
                : 'Adding...'
              : isEditMode
              ? 'Save changes'
              : 'Add Dish'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddFoodsModal
