import { Request, Response } from 'express'
import { FoodModel } from '../../model/food.model'

export const getFoodsByCategory = async (
  _request: Request,
  response: Response
) => {
  const result = await FoodModel.aggregate([
    {
      $lookup: {
        from: 'foodcategories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryInfo',
      },
    },
    {
      $unwind: '$categoryInfo',
    },
    {
      $group: {
        _id: '$categoryInfo.categoryName',
        foods: {
          $push: {
            _id: '$_id',
            foodName: '$foodName',
            image: '$image',
            price: '$price',
            ingredients: '$ingredients',
          },
        },
      },
    },
  ])

  const groupdByCategory = result.reduce((acc, item) => {
    acc[item._id] = item.foods
    return acc
  }, {})
  console.log(groupdByCategory, 'groupdByCategory')

  response.send({ foods: groupdByCategory })
}
