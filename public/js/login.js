/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      // s('Logged in successfully!');
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    // console.log(err.response.data);
    // alert(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

// document.querySelector('.form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   const email = document.querySelector('#email').value;
//   const password = document.querySelector('#password').value;
//   login(email, password);
// });

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again');
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status !== 'success') throw new Error('Unable to create account.');
    showAlert('success', 'Account created successfully!');
    window.setTimeout(() => location.assign('/'), 1500);
    return true;
  } catch (err) {
    showAlert(
      'error',
      (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        'Unable to create account. Please try again.',
    );
    return false;
  }
};
