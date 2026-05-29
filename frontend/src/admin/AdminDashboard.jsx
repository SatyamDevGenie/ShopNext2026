import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import { getAllOrders } from '../redux/slices/orderSlice'
import { getAllUsers } from '../redux/slices/authSlice'
import Loader from '../components/Loader'
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign } from 'react-icons/fa'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { products, loading: productsLoading } = useSelector((state) => state.products)
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders)
  const { users, loading: usersLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch])

  if (productsLoading || ordersLoading || usersLoading) return <Loader />

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length
  const totalProducts = products.length
  const totalUsers = users.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-primary">₹{totalRevenue.toFixed(2)}</p>
            </div>
            <FaRupeeSign className="text-3xl sm:text-4xl text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Orders</p>
              <p className="text-xl sm:text-2xl font-bold text-primary">{orders.length}</p>
              <p className="text-xs text-gray-500">{pendingOrders} pending</p>
            </div>
            <FaShoppingCart className="text-3xl sm:text-4xl text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Products</p>
              <p className="text-xl sm:text-2xl font-bold text-primary">{totalProducts}</p>
            </div>
            <FaBox className="text-3xl sm:text-4xl text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold text-primary">{totalUsers}</p>
            </div>
            <FaUsers className="text-3xl sm:text-4xl text-primary opacity-20" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <Link to="/admin/add-product" className="btn-primary text-center text-sm sm:text-base">
            Add New Product
          </Link>
          <Link to="/admin/products" className="btn-secondary text-center text-sm sm:text-base">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="btn-secondary text-center text-sm sm:text-base">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">{order._id}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
