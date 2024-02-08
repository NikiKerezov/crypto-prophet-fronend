import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000', // Change text color to black
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const StripeCardForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8080/api/payment/charge", "", {         
          headers: {
            token: id,
            amount: 30,
          },
        }).then(() => {
            alert("Payment Success");
            if (response.data)
              console.log(response.data);
          }).catch((error) => {
            alert(error);
            if (response.data)
              console.log(response.data);
          });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      {!success ?
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button style={{ marginTop: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Pay</button>
        </form>
        :
        <div>
          <h2>You just bought a sweet spatula congrats</h2>
        </div>
      }
    </div>
  );
};

export default StripeCardForm;
