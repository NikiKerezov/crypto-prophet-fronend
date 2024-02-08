import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeCardForm from './StripeCard';
import { Container } from 'reactstrap';
const PUBLIC_KEY = "pk_test_51Oh8D3GtZ4KJVRzk02rYvpf1v5fmZl90Iq6nqiV7Q6Y9YL0L1u2Xq2gQVu72RxtHa8bnv7Kpc0S4lS5Mq7umgF9x00SNcm3Ivy"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Container>
      <Elements stripe={stripeTestPromise}>
        <StripeCardForm />
      </Elements>
    </Container>
    );
}