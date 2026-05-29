import React from 'react'

const Disclaimer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <p className="text-gray-700">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div>
          <h2 className="text-2xl font-bold mb-4">Website Disclaimer</h2>
          <p className="text-gray-700">
            The information provided by ShopNest on our website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Product Information</h2>
          <p className="text-gray-700">
            We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, images, or other content on this site is accurate, complete, reliable, current, or error-free.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <p className="text-gray-700">
            All prices are subject to change without notice. We reserve the right to modify or discontinue products without prior notice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">External Links</h2>
          <p className="text-gray-700">
            Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-gray-700">
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
