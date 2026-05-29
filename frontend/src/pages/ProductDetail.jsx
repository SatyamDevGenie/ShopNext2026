import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import Loader from '../components/Loader'
import { FaStar, FaMinus, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

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
      toast.success(`${product.name} added to cart!`)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 sm:h-96 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-2 text-gray-600 text-sm sm:text-base">
                {product.ratings.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <span className="text-3xl sm:text-4xl font-bold text-primary">
              ₹{product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
          </div>

          {/* Category */}
          <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700">
              {product.category}
            </span>
          </div>

          {/* Stock Status */}
          <div>
            <p className={`text-base sm:text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={decrementQty}
                  className="bg-gray-200 hover:bg-gray-300 p-2 sm:p-3 rounded-lg transition"
                  disabled={qty === 1}
                >
                  <FaMinus className="text-sm sm:text-base" />
                </button>
                <span className="text-lg sm:text-xl font-semibold w-10 sm:w-12 text-center">{qty}</span>
                <button
                  onClick={incrementQty}
                  className="bg-gray-200 hover:bg-gray-300 p-2 sm:p-3 rounded-lg transition"
                  disabled={qty === product.stock}
                >
                  <FaPlus className="text-sm sm:text-base" />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-white transition text-sm sm:text-base ${
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
