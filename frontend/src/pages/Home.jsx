import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productSlice'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import { FaShippingFast, FaShieldAlt, FaHeadset, FaTag, FaStar, FaArrowRight } from 'react-icons/fa'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const featuredProducts = products.slice(0, 8)

  if (loading) return <Loader />

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Modern SaaS Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in-down">
              <FaStar className="text-yellow-300 mr-2" />
              <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in-up">
              Shop Smarter,
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Discover amazing products at unbeatable prices. Quality guaranteed, fast shipping, and exceptional customer service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
              <Link 
                to="/shop" 
                className="group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center"
              >
                Start Shopping
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { number: '10K+', label: 'Happy Customers' },
                { number: '5K+', label: 'Products' },
                { number: '4.9', label: 'Rating' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${600 + index * 100}ms` }}>
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShopNest?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaShippingFast className="text-4xl" />,
                title: 'Fast Delivery',
                description: 'Free shipping on orders over ₹500. Get your products delivered within 2-5 days.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <FaShieldAlt className="text-4xl" />,
                title: 'Secure Payment',
                description: 'Your payment information is encrypted and secure with Razorpay integration.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: <FaHeadset className="text-4xl" />,
                title: '24/7 Support',
                description: 'Our customer support team is always here to help you with any questions.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <FaTag className="text-4xl" />,
                title: 'Best Prices',
                description: 'Competitive pricing and regular discounts on all your favorite products.',
                color: 'from-orange-500 to-orange-600'
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of trending products
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <FaTag className="text-3xl text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-6">No products available at the moment.</p>
              <Link to="/shop" className="btn-primary inline-block">
                Browse All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {products.length > 8 && (
                <div className="text-center mt-12">
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View All Products
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best online shopping
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Shop Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Add custom animations to index.css */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Home
