import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const Shop = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Get unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))]

  // Filter and sort products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.ratings - a.ratings)
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Shop All Products</h1>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-base sm:text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Shop
