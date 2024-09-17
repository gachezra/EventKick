import React, { useState } from 'react';
import axios from 'axios';
import { saveTransactionRoute } from '../utils/APIRoutes';

const PaymentPage = ({ eventId, amount, name, onPaymentSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Not yet paid');
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const user = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  );
  const userId = user._id;
  const number = '254' + String(phoneNumber).slice(-9);

  const handlePayment = async () => {

    setCheckoutRequestId('ws_CO_08082024212032918711889669')
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:27684/api/stkPush', {
        phone: number,
        amount: 1,
        Order_ID: `${eventId}_${number}`
      });

      if (response.data.ResponseCode === "0") {
        setCheckoutRequestId(response.data.CheckoutRequestID);
        setPaymentStatus('Payment initiated. Please complete the payment on your phone.');
        setTimeout(() => setShowConfirmButton(true), 20000); // Show confirm button after 20 seconds
      } else {
        setPaymentStatus('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async () => {
    if (!checkoutRequestId) {
      setPaymentStatus('No payment to confirm');
      return;
    }

    try {
      const confirmResponse = await axios.post('http://localhost:27684/api/confirmPayment', {
        CheckoutRequestID: checkoutRequestId
      });

      setPaymentStatus('Payment successful');
      console.log('Calling confirm payment with checkout ID: ', checkoutRequestId);
      console.log('Confirm response: ', confirmResponse);

      if (confirmResponse.data.success) {
        setPaymentStatus('Payment successful');

        const message = confirmResponse.data.resultdDesc

        const transactionDetais = {
          eventId: eventId,
          amount: amount,
          name: name,
          phoneNumber: number,
          checkoutRequestId: checkoutRequestId,
          paymentStatus: message
        }

        const response = await axios.post(saveTransactionRoute, {
          userId: userId,
          transactionData: transactionDetais
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('Transaction details saved:', response);

        onPaymentSuccess();
      } else {
        setPaymentStatus('Payment failed or cancelled');
      }
    } catch (error) {
      console.error('Confirmation error:', error);
      setPaymentStatus('An error occurred during payment confirmation');
    }
  };

  return (
    <div>
      <form>
        <div>
          <p className='mb-4'>Pay <span className='font-bold'>{amount}</span> for event: <span className='font-bold'>{name}</span></p>
          <label>Phone Number:</label>
          <input
            type="text"
            className='ml-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#4e0eff]'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handlePayment}
          className='my-3 px-4 py-1 bg-transparent border-2 border-indigo-600 rounded-full text-indigo-600 hover:bg-opacity-10 hover:bg-gray-300'
          disabled={loading}
          type="button"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
        {paymentStatus && <p>{paymentStatus}</p>}
          <button
            onClick={confirmPayment}
            className='mt-3 px-4 py-1 bg-transparent border-2 border-green-600 rounded-full text-green-600 hover:bg-opacity-10 hover:bg-gray-300'
            type="button"
          >
            Confirm Payment
          </button>
        {showConfirmButton && (
          <button
            onClick={confirmPayment}
            className='mt-3 px-4 py-1 bg-transparent border-2 border-green-600 rounded-full text-green-600 hover:bg-opacity-10 hover:bg-gray-300'
            type="button"
          >
            Confirm Payment
          </button>
        )}
      </form>
    </div>
  );
};

export default PaymentPage;