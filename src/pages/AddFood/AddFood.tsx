import React, { useRef, useState } from 'react'
import { assets } from '../../assets'
import type { FoodDetails } from '../../types/commonTypes'
import { toast } from 'react-toastify'
import { addFood } from '../../services/foodService'

const AddFood: React.FC = () => {
  const [image, setImage] = useState(null)
  const [details, setDetails] = useState<FoodDetails>({
    name: '',
    description: '',
    category: 'Biryani',
    price: '',
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setDetails(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!image) {
      alert('Please upload an image')
      return
    }

    if (!details.name || !details.description || !details.price) {
      alert('Please fill all the fields')
      return
    }

    try {
      const response = await addFood(details, image)
      if (response.status === 200) {
        toast.success('Food added successfully')
        setImage(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        setDetails({
          name: '',
          description: '',
          category: 'Biryani',
          price: '',
        })
      }
    } catch (err) {
      toast.error('Failed to add food. Please try again.')
      return
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Add Food</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    width={98}
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="preview"
                  />
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter food name"
                  value={details.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows={3}
                  placeholder="Enter description"
                  value={details.description}
                  onChange={handleInputChange}></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  className="form-control"
                  id="category"
                  value={details.category}
                  onChange={handleInputChange}>
                  <option value="Biryani">Biryani</option>
                  <option value="South Indian">South Indian</option>
                  <option value="North Indian">North Indian</option>
                  <option value="Burger">Burger</option>
                  <option value="Cake">Cake</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Paratha">Paratha</option>
                  <option value="Shake">Shake</option>
                  <option value="Dosa">Dosa</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Kebab">Kebab</option>
                  <option value="Shawarma">Shawarma</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  placeholder="Enter price"
                  value={details.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddFood
