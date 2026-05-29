import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import Loader from '../components/Loader'
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { product, loading } = useSelector((state) => state.products)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }))
      navigate('/cart')
    }
  }

  const incrementQty = () => {
    if (qty < product.stock) {
      setQty(qty + 1)
    }
  }

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }

  if (loading) return <Loader />
  if (!product) return <div className="text-center py-12">Product not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-2 text-gray-600">
                {product.ratings.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700">
              {product.category}
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decrementQty}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
                  disabled={qty === 1}
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{qty}</span>
                <button
                  onClick={incrementQty}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"
                  disabled={qty === product.stock}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              product.stock > 0
                ? 'bg-primary hover:bg-secondary'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
