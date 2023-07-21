import React, { useState, useRef } from 'react';
import { useStripe, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState('');
  const [isCardSelected, setIsCardSelected] = useState(false);
  const cardElement = useRef(null);

  const handlePayment = async () => {
    if (!stripe) {
      return;
    }

    if (!isCardSelected) {
      // Handle the case when the user hasn't selected the card
      setErrorMessage('Please select a card to proceed with the payment.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement.current,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Handle payment success on the front end and call onPaymentSuccess
      onPaymentSuccess(paymentMethod.id);
    }
  };

  const handleCardSelection = () => {
    setIsCardSelected(!isCardSelected);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-gray-200 rounded shadow">
      <div
        className={`mb-4 cursor-pointer ${
          isCardSelected ? 'border-blue-500' : 'border-gray-300'
        } border-2 rounded p-2`}
        onClick={handleCardSelection}
      >
        {/* Add the CardElement to collect card details */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                '::placeholder': {
                  color: '#1d5196',
                },
              },
            },
          }}
          onChange={(event) => {
            setErrorMessage(event.error ? event.error.message : '');
          }}
          onReady={(element) => (cardElement.current = element)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePayment}
      >
        Pay KSh.200
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default PaymentForm;




