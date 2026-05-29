import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, updateProduct } from '../redux/slices/productSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { product, loading, error } = useSelector((state) => state.products)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (product && product._id === id) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageUrl: product.imageUrl,
      })
    }
  }, [product, id])

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
    } else {
      productData.append('imageUrl', formData.imageUrl)
    }

    try {
      await dispatch(updateProduct({ id, productData })).unwrap()
      toast.success('Product updated successfully!')
      navigate('/admin/products')
    } catch (err) {
      console.error('Failed to update product:', err)
      toast.error(err || 'Failed to update product')
    }
  }

  if (loading) return <Loader />
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Product</h1>

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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="h-32 w-32 object-cover rounded mb-2"
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Upload New Image
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
              {loading ? 'Updating...' : 'Update Product'}
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

export default EditProduct
