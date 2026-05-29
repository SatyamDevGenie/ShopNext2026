import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress, clearCart } from '../redux/slices/cartSlice'
import { createOrder } from '../redux/slices/orderSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { cartItems, shippingAddress } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    fullName: shippingAddress.fullName || '',
    street: shippingAddress.street || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || 'India',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Save shipping address
      dispatch(saveShippingAddress(formData))

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        const errorMsg = 'Failed to load Razorpay SDK. Please check your internet connection.'
        setError(errorMsg)
        toast.error(errorMsg)
        setLoading(false)
        return
      }

      // Create Razorpay order
      const { data: razorpayOrder } = await axios.post('/api/payment/order', {
        amount: Math.round(total * 100), // Convert to paise
      })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'ShopNext2026',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async function (response) {
          console.log('Razorpay payment response:', response)
          try {
            // Verify payment
            console.log('Verifying payment...')
            const { data: verifyData } = await axios.post('/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
            console.log('Payment verification response:', verifyData)

            if (verifyData.success) {
              // Create order in database
              const orderData = {
                items: cartItems.map((item) => ({
                  productId: item._id,
                  qty: item.qty,
                  price: item.price,
                })),
                totalAmount: total,
                address: formData,
                paymentId: response.razorpay_payment_id,
              }

              console.log('Creating order with data:', orderData)
              const result = await dispatch(createOrder(orderData)).unwrap()
              console.log('Order created successfully:', result)
              
              toast.success('Payment successful! Order placed.')
              
              // Small delay to ensure order is saved
              await new Promise(resolve => setTimeout(resolve, 500))
              
              dispatch(clearCart())
              navigate('/ordersuccess')
            } else {
              const errorMsg = 'Payment verification failed. Please contact support.'
              setError(errorMsg)
              toast.error(errorMsg)
              console.error('Payment verification failed:', verifyData)
              setLoading(false)
            }
          } catch (err) {
            console.error('Order creation error:', err)
            console.error('Error details:', err.response?.data)
            const errorMsg = err.message || 'Failed to create order. Please contact support.'
            setError(errorMsg)
            toast.error(errorMsg)
            setLoading(false)
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            setError('Payment cancelled')
            toast.warning('Payment cancelled')
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Payment failed. Please try again.'
      setError(errorMsg)
      toast.error(errorMsg)
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shipping Address</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 text-sm sm:text-base">
                {error}
              </div>
            )}

            <form onSubmit={handlePayment}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full btn-primary text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 sticky top-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.qty}
                  </span>
                  <span className="font-semibold">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
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

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Test Mode:</strong> Use Razorpay test cards for payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
