import React, { useEffect, useState } from 'react'
import type { ListFoodDetails } from '../../types/commonTypes'
import { deleteFood, getFoods } from '../../services/foodService'
import { toast } from 'react-toastify'

const ListFood: React.FC = () => {
  const [foods, setFoods] = useState<ListFoodDetails[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const data = await getFoods()
      setFoods(data)
    } catch (err) {
      console.error('Error fetching foods:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await deleteFood(id)
      setFoods(prev => prev.filter(f => f.id !== id))
      toast.success('Food deleted successfully')
    } catch (err) {
      console.error('Error deleting food:', err)
      toast.error('Failed to delete food')
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="container my-4">
      <h2 className="mb-4">Food List</h2>
      <table className="table table-striped table-bordered align-middle text-center">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.length > 0 ? (
            foods.map(food => (
              <tr key={food.id}>
                <td>
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </td>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>{food.price}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(food.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No food items available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ListFood
