import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Elements>
  </React.StrictMode>,
);

reportWebVitals();

