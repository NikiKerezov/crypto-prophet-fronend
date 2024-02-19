import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeCardForm from './StripeCard';
import { Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import BuyButtonComponent from './StripeButton'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';


const StripeContainer = () => {
  return <>
    <BuyButtonComponent>
    </BuyButtonComponent>
  </>
}

export default StripeContainer;