import React from 'react'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About ShopNext</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <p className="text-lg text-gray-700">
          Welcome to ShopNest, your number one source for all things shopping. We're dedicated to providing you the very best of products, with an emphasis on quality, customer service, and uniqueness.
        </p>

        <p className="text-gray-700">
          Founded in 2024, ShopNest has come a long way from its beginnings. When we first started out, our passion for providing the best shopping experience drove us to start our own business.
        </p>

        <p className="text-gray-700">
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            To provide high-quality products at affordable prices while delivering exceptional customer service and creating a seamless online shopping experience.
          </p>
        </div>

        <div className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Wide range of quality products</li>
            <li>Competitive pricing</li>
            <li>Secure payment options</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer support</li>
            <li>Easy returns and refunds</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
