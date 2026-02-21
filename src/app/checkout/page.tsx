'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'cod'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-master-navy mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase, {formData.firstName}. We have sent a confirmation email to {formData.email}.
            </p>
            <p className="text-sm text-gray-500 mb-6">Order #BN-{Math.floor(Math.random() * 10000)}</p>
            <a href="/" className="inline-block bg-master-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-master-navy transition">
              Return Home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-master-navy mb-4">Your Cart is Empty</h1>
            <a href="/shop" className="text-master-blue hover:underline font-bold">Start Shopping</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-master-navy mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-master-navy mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-master-navy mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-master-blue focus:border-master-blue"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-master-navy mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-master-blue focus:ring-master-blue"
                    />
                    <span className="ml-3 font-medium">Cash on Delivery (COD)</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={formData.paymentMethod === 'jazzcash'}
                      onChange={handleInputChange}
                      className="text-master-blue focus:ring-master-blue"
                    />
                    <div className="ml-3">
                      <span className="font-medium block">JazzCash</span>
                      <span className="text-sm text-gray-500">Pay securely with your JazzCash mobile account</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={formData.paymentMethod === 'easypaisa'}
                      onChange={handleInputChange}
                      className="text-master-blue focus:ring-master-blue"
                    />
                    <div className="ml-3">
                      <span className="font-medium block">EasyPaisa</span>
                      <span className="text-sm text-gray-500">Pay securely with your EasyPaisa mobile account</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-master-blue focus:ring-master-blue"
                    />
                    <div className="ml-3">
                      <span className="font-medium block">Credit/Debit Card</span>
                      <span className="text-sm text-gray-500">Visa, Mastercard (Powered by PayFast)</span>
                    </div>
                  </label>
                </div>

                {/* Loyalty Placeholder */}
                <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-100">
                  <h3 className="font-bold text-master-blue mb-2">Loyalty Points</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Earn <strong>{Math.floor(cartTotal / 100)}</strong> points with this purchase.
                  </p>
                  <div className="flex gap-2">
                    <button type="button" className="bg-black text-white px-3 py-1 rounded text-xs font-bold">
                      Add to Apple Wallet
                    </button>
                    <button type="button" className="bg-white border border-gray-300 text-gray-800 px-3 py-1 rounded text-xs font-bold">
                      Save to Google Pay
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-master-navy mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>PKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-master-navy pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>PKR {cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`w-full mt-6 bg-master-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-master-navy transition ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
