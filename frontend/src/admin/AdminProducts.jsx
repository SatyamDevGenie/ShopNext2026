import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../redux/slices/productSlice'
import Loader from '../components/Loader'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          toast.success('Product deleted successfully')
        })
        .catch((err) => {
          toast.error(err || 'Failed to delete product')
        })
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Manage Products</h1>
        <Link to="/admin/add-product" className="btn-primary flex items-center space-x-2 text-sm sm:text-base">
          <FaPlus />
          <span>Add Product</span>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No products available.</p>
          <Link to="/admin/add-product" className="btn-primary">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-semibold">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                      <span className={`text-xs sm:text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit className="text-base sm:text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="text-base sm:text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
