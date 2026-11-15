/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Redirect to the Stripe-hosted checkout form
    const checkoutUrl = session.data.session.url;
    if (!checkoutUrl) throw new Error('Unable to start checkout. Please try again.');
    window.location.assign(checkoutUrl);
    return true;
  } catch (err) {
    console.log(err);
    showAlert(
      'error',
      (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        'Unable to start checkout. Please try again.',
    );
    return false;
  }
};
