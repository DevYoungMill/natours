/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTs
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nal__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

if (signupForm) {
  const password = signupForm.querySelector('#password');
  const passwordConfirm = signupForm.querySelector('#password-confirm');
  const validatePasswords = () => {
    passwordConfirm.setCustomValidity(
      password.value === passwordConfirm.value ? '' : 'Passwords must match.',
    );
  };
  password.addEventListener('input', validatePasswords);
  passwordConfirm.addEventListener('input', validatePasswords);
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    validatePasswords();
    if (!signupForm.reportValidity()) return;
    const button = signupForm.querySelector('button[type="submit"]');
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Creating account...';
    const created = await signup(
      signupForm.querySelector('#name').value.trim(),
      signupForm.querySelector('#email').value.trim(),
      password.value,
      passwordConfirm.value,
    );
    if (!created) {
      button.disabled = false;
      button.textContent = 'Sign up';
    }
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    const photo = document.getElementById('photo').files[0];
    if (photo) form.append('photo', photo);
    console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    if (button.disabled) return;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    const { tourId } = button.dataset;
    const redirecting = await bookTour(tourId);
    if (!redirecting) {
      button.textContent = originalText;
      button.disabled = false;
    }
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
