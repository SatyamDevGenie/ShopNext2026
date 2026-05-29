import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartItemQty } from '../redux/slices/cartSlice'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
    toast.success('Item removed from cart')
  }

  const handleUpdateQty = (id, qty) => {
    dispatch(updateCartItemQty({ id, qty }))
    toast.info('Cart updated')
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  const handleCheckout = () => {
    if (userInfo) {
      navigate('/checkout')
    } else {
      navigate('/login?redirect=/checkout')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center border-b last:border-b-0 p-3 sm:p-4 gap-3 sm:gap-0"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1 sm:ml-4 w-full sm:w-auto">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-base sm:text-lg font-semibold hover:text-primary block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm sm:text-base">₹{item.price.toFixed(2)}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleUpdateQty(item._id, item.qty - 1)}
                      disabled={item.qty === 1}
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded disabled:opacity-50 transition"
                    >
                      <FaMinus className="text-xs sm:text-sm" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm sm:text-base">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item._id, item.qty + 1)}
                      disabled={item.qty === item.stock}
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded disabled:opacity-50 transition"
                    >
                      <FaPlus className="text-xs sm:text-sm" />
                    </button>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto sm:text-right gap-2">
                  <p className="text-base sm:text-lg font-bold text-primary">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash className="text-sm sm:text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Tax (18% GST)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary text-sm sm:text-base"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block text-center mt-4 text-primary hover:underline text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
