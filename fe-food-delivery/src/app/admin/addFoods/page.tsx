'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import AddFoodsModal from './_components/AddFoodsModal'
import AddCategoryModal from './_components/AddCategoryModal'

type Category = {
  _id: string
  categoryName: string
  count?: number
}

type Food = {
  _id: string
  foodName: string
  food?: Food
  image: string
  price: number
  ingredients: string
  category?: string
}
type Props = {
  category: string
  food?: Food | null
  onClose: () => void
  onSuccess: () => void
}

const BASE_URL = 'http://localhost:8000'

const AddFoods = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All Dishes')
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const [catRes, foodRes] = await Promise.all([
        axios.get(`${BASE_URL}/allCategories`),
        axios.get(`${BASE_URL}/foods`),
      ])

      const rawCategories = catRes.data.categories || []
      const rawFoodsObj = foodRes.data.foods || {}

      const foodsArray: Food[] = Object.entries(rawFoodsObj).flatMap(
        ([categoryName, items]) =>
          (items as Food[]).map((food) => ({
            ...food,
            category: categoryName,
          }))
      )

      const categoryCountMap: Record<string, number> = {}
      foodsArray.forEach((food) => {
        if (!food.category) return
        const key = food.category
        categoryCountMap[key] = (categoryCountMap[key] || 0) + 1
      })

      const categoriesWithCount = rawCategories.map((cat: Category) => ({
        ...cat,
        count: categoryCountMap[cat.categoryName] || 0,
      }))

      setCategories(categoriesWithCount)
      setFoods(foodsArray)
      setError('')
    } catch (err) {
      console.error(' Failed to load data:', err)
      setError('Failed to load food or category data.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredFoods =
    selectedCategory === 'All Dishes'
      ? foods
      : foods.filter(
          (food) =>
            food.category?.toLowerCase() === selectedCategory.toLowerCase()
        )

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Dishes category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full border ${
              selectedCategory === 'All Dishes'
                ? 'bg-red-100 text-red-600 border-red-400'
                : 'bg-black text-white'
            }`}
            onClick={() => setSelectedCategory('All Dishes')}
          >
            All Dishes
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedCategory === cat.categoryName
                  ? 'bg-red-100 text-red-600 border-red-400'
                  : 'bg-black text-white'
              }`}
              onClick={() => setSelectedCategory(cat.categoryName)}
            >
              {cat.categoryName}
              <span className="ml-1 text-xs font-semibold">{cat.count}</span>
            </button>
          ))}
          <button
            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
            onClick={() => setShowCategoryModal(true)}
            aria-label="Add new category"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {selectedCategory === 'All Dishes' ? (
        categories.map((cat) => {
          const foodsInCategory = foods.filter(
            (food) =>
              food.category?.toLowerCase() === cat.categoryName.toLowerCase()
          )
          return (
            <FoodGridSection
              key={cat._id}
              title={cat.categoryName}
              count={foodsInCategory.length}
              foods={foodsInCategory}
              onAddClick={() => {
                setSelectedFood(null)
                setShowFoodModal(true)
              }}
              onEditClick={(food) => {
                setSelectedFood(food)
                setShowFoodModal(true)
              }}
            />
          )
        })
      ) : (
        <FoodGridSection
          title={selectedCategory}
          count={filteredFoods.length}
          foods={filteredFoods}
          onAddClick={() => {
            setSelectedFood(null)
            setShowFoodModal(true)
          }}
          onEditClick={(food) => {
            setSelectedFood(food)
            setShowFoodModal(true)
          }}
        />
      )}

      {showFoodModal && (
        <AddFoodsModal
          categories={categories.map((cat) => cat.categoryName)}
          food={selectedFood}
          category={selectedCategory}
          onClose={() => {
            setShowFoodModal(false)
            setSelectedFood(null)
          }}
          onSuccess={fetchData}
        />
      )}

      {showCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSuccess={fetchData}
        />
      )}
    </main>
  )
}

function FoodGridSection({
  title,
  count,
  foods,
  onAddClick,
  onEditClick,
}: {
  title: string
  count: number
  foods: Food[]
  onAddClick: () => void
  onEditClick: (food: Food) => void
}) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        {title} ({count})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-red-400 p-4 rounded-lg text-center hover:bg-red-50 transition cursor-pointer"
          onClick={onAddClick}
        >
          <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mb-2">
            <Plus size={20} />
          </div>
          <p className="text-sm font-medium">Add new Dish to {title}</p>
        </div>

        {foods.length === 0 ? (
          <p className="text-sm text-gray-400 col-span-full">
            No foods found in {title}.
          </p>
        ) : (
          foods.map((food, ind) => (
            <div
              key={ind}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative">
                <Image
                  src={food.image}
                  alt={food.foodName}
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                  aria-label={`Edit ${food.foodName}`}
                  onClick={() => onEditClick(food)}
                >
                  <Pencil size={16} />
                </button>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-red-600 font-medium">
                    {food.foodName}
                  </p>
                  <p className="text-sm font-semibold">
                    ₮{food.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{food.ingredients}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AddFoods
