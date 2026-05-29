import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, updateOrderStatus } from '../redux/slices/orderSlice'
import Loader from '../components/Loader'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const { orders, loading } = useSelector((state) => state.orders)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }))
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Manage Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold">{order._id}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                    className="text-primary hover:underline text-sm font-semibold"
                  >
                    {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
                  </button>

                  {expandedOrder === order._id && (
                    <div className="mt-4 space-y-4">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-2">Order Items</h3>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>Product ID: {item.productId}</span>
                              <span>Qty: {item.qty} × ₹{item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <p className="text-sm text-gray-600">
                          {order.address.fullName}<br />
                          {order.address.street}<br />
                          {order.address.city}, {order.address.postalCode}<br />
                          {order.address.country}
                        </p>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h3 className="font-semibold mb-2">Payment Information</h3>
                        <p className="text-sm text-gray-600">
                          Payment ID: {order.paymentId}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
