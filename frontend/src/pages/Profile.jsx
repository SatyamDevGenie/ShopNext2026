import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../redux/slices/orderSlice'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const { myOrders, loading } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* User Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Account Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="font-semibold">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-semibold break-all">{userInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="font-semibold capitalize">{userInfo.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">My Orders</h2>
            
            {myOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                <Link to="/shop" className="btn-primary">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((order) => (
                  <div key={order._id} className="border rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-sm break-all">{order._id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Date</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Items</span>
                        <span>{order.items.length} item(s)</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="font-bold text-primary">₹{order.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600">Payment ID</span>
                        <span className="text-xs break-all">{order.paymentId}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Shipping Address</p>
                      <p className="text-xs sm:text-sm">
                        {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.postalCode}, {order.address.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
