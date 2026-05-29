import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../redux/slices/productSlice'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.products)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const productData = new FormData()
    productData.append('name', formData.name)
    productData.append('description', formData.description)
    productData.append('price', formData.price)
    productData.append('category', formData.category)
    productData.append('stock', formData.stock)
    
    if (imageFile) {
      productData.append('image', imageFile)
    } else if (formData.imageUrl) {
      productData.append('imageUrl', formData.imageUrl)
    }

    try {
      await dispatch(createProduct(productData)).unwrap()
      toast.success('Product created successfully!')
      navigate('/admin/products')
    } catch (err) {
      console.error('Failed to create product:', err)
      toast.error(err || 'Failed to create product')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Add New Product</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="input-field"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="input-field"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g., Electronics, Clothing, Furniture"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
