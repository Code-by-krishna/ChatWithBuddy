import React, { useState } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error('Error:', error);
      alert('Payment failed: ' + error.message);
    } else {
      // Replace with your server-side payment handling
      const response = await fetch('/api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Payment successful!');
        onSuccess();
      } else {
        alert('Payment failed: ' + result.error);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Card Details:</label>
        <CardElement className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full px-4 py-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'} text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default function PaymentGateway() {
  const handlePaymentSuccess = () => {
    // Handle post-payment actions like redirecting or updating the UI
    console.log('Payment was successful!');
  };

  return (
    <div className="container mx-auto mt-8 p-6 max-w-md bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
}
