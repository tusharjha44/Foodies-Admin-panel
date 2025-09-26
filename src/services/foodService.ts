import axios from 'axios'
import type { FoodDetails } from '../types/commonTypes'

const API_URL = 'http://localhost:8080/api/foods'

export const addFood = async (foodData: FoodDetails, image: any) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('food', JSON.stringify(foodData))

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (err) {
    console.error('Error adding food:', err)
    alert('Failed to add food. Please try again.')
    throw err
  }
}

export const getFoods = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const deleteFood = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`)
}