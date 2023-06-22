import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import CheckoutForm from './CheckoutForm'

import '../styles/Checkout.css'

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ''
const stripePromise = loadStripe(stripeKey)

interface CheckoutProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}


const Checkout: React.FC<CheckoutProps> = ({user, setUser}) => {
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // NEEDS TO BE BACK END URL
        fetch(`http://localhost:5000/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    
      return (
        <div className="App">
          {clientSecret && (
            <Elements options={{clientSecret: clientSecret, appearance: {theme: 'stripe'}}} stripe={stripePromise}>
              <CheckoutForm user={user} setUser={setUser}/>
            </Elements>
          )}
        </div>
      );
}

export default Checkout
