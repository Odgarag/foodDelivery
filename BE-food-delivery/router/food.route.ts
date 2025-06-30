import { Router } from 'express'
import { tokenChecker } from '../middleware/token-checker'
import { addFood } from '../controller/food/add-food'
import { getFoodsByCategory } from '../controller/food/get-foods-by-category'
import { updateFood } from '../controller/food/update-food'

export const FoodRouter = Router()

FoodRouter.post('/addFood', tokenChecker, addFood)
FoodRouter.get('/foods', getFoodsByCategory)
FoodRouter.put('/foods/:id', tokenChecker, updateFood)
