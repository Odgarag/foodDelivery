import { Router } from 'express'
import { tokenChecker } from '../middleware/token-checker'
import { getCategories } from '../controller/category/get-categories'
import { createCategory } from '../controller/category/create-category'

export const CategoryRouter = Router()

CategoryRouter.post('/addCategory', tokenChecker, createCategory)
CategoryRouter.get('/allCategories', getCategories)
