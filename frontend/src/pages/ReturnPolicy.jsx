import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Return & Refund Policy</h1>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <p className="text-gray-700">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div>
          <h2 className="text-2xl font-bold mb-4">Returns</h2>
          <p className="text-gray-700 mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.
          </p>
          <p className="text-gray-700">
            To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Return Process</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Contact our customer service team to initiate a return</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Ship the item back to us using a trackable shipping method</li>
            <li>Once we receive your return, we'll inspect it and process your refund</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Refunds</h2>
          <p className="text-gray-700 mb-4">
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          </p>
          <p className="text-gray-700">
            If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Personal care items</li>
            <li>Items marked as final sale</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
          <p className="text-gray-700">
            We only replace items if they are defective or damaged. If you need to exchange an item, contact us at support@shopnest.com.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Costs</h2>
          <p className="text-gray-700">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our return policy, please contact us at support@shopnest.com.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy
