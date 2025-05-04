import React, { useState } from 'react';

export default function OrderForm() {
  const [orderType, setOrderType] = useState('delivery');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    // Hide the alert after 6 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 6000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center mt-11 py-12 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md relative">
        {/* Success Alert */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
              className="absolute inset-0 bg-black/10 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            ></div>
            <div className="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full mx-4 transform transition-all duration-300 translate-y-0 scale-100">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 text-center mb-4">
                {orderType === 'delivery' 
                  ? "Your order is on the way! You'll receive an update when it's out for delivery."
                  : "Your order is being prepared! You'll receive an update when it's ready for pickup."}
              </p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Title - only shown for takeaway view */}
        {orderType === 'takeaway' && (
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-orange-900">Order Online</h1>
            <p className="text-gray-600 mt-2">
              Place your order for delivery or takeaway. Our fresh, hot pizza will be with you in no time!
            </p>
          </div>
        )}
        
        {/* Order Type Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-amber-800 mb-4">Choose Order Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`flex items-center justify-center py-3 px-4 rounded-md ${
                orderType === 'delivery'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-amber-800 border border-gray-200'
              }`}
              onClick={() => handleOrderTypeChange('delivery')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Delivery
            </button>
            <button
              className={`flex items-center justify-center py-3 px-4 rounded-md ${
                orderType === 'takeaway'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-amber-800 border border-gray-200'
              }`}
              onClick={() => handleOrderTypeChange('takeaway')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Takeaway
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-amber-800 mb-4">Your Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>
          
          {/* Delivery Address - only shown for delivery */}
          {orderType === 'delivery' && (
            <div>
              <label className="block text-gray-700 mb-1">Delivery Address *</label>
              <textarea
                placeholder="Your full address"
                className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 h-24 resize-none"
              />
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-amber-800 mb-4">Payment Method</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer">
              <input type="radio" name="payment" className="form-radio text-orange-500 mr-2" defaultChecked />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cash on Delivery
            </label>
            <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer">
              <input type="radio" name="payment" className="form-radio text-orange-500 mr-2" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Online Payment
            </label>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-amber-800 mb-4">Special Instructions</h2>
          <textarea
            placeholder="Any special requests for your order?"
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button 
          className="w-full bg-orange-500 hover:bg-orange-700 text-white py-3 px-4 rounded-md transition duration-200"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}