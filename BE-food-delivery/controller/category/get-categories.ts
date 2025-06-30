import { Request, Response } from 'express'
import { CategoryModel } from '../../model/category'

export const getCategories = async (_request: Request, response: Response) => {
  try {
    const allCategories = await CategoryModel.find()
    response.send({ categories: allCategories })
    console.log(allCategories)
  } catch (error) {
    response.status(400).json({ message: 'Failed to fetch categories' })
  }
}
