import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import BuyButtonComponent from './StripeButton'
import CancelSubscriptionButton from './CancelSubscriptionButton';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from 'axios';
import Cookies from 'js-cookie';


const StripeCancellationContainer = () => {
  const jwtToken = Cookies.get('token');
  const username = Cookies.get('username');

  const cancelSubscription = async () => { 
    try {
      const response = await axios.post('http://localhost:8080/stripe/cancel-subscription', username, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Subscription cancelled successfully!', response.data);
        alert("Subscription cancelled successfully!");
        Cookies.set('isProfileEnabled', false);
        window.location.reload();
      } else {
        alert("Error cancelling subscription");
        throw new Error(`API error: ${response.status}`);
      }
    }
    catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  }
  return <>
    <CancelSubscriptionButton onClick={cancelSubscription}>
    </CancelSubscriptionButton>
  </>
}

export default StripeCancellationContainer;