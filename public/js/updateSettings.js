/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      if (type === 'data' && res.data.data.user.photo) {
        document.querySelector('.form__user-photo').src =
          `/img/users/${res.data.data.user.photo}`;
      }
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
