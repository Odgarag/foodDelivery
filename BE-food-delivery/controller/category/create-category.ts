import { Request, Response } from 'express'
import { CategoryModel } from '../../model/category'

export const createCategory = async (request: Request, response: Response) => {
  try {
    const { categoryName } = request.body

    await CategoryModel.create({ categoryName })
    response.send({ message: 'Successfully create category' })
  } catch (error) {
    response.status(400).send({ message: 'category name order' })
  }
}
