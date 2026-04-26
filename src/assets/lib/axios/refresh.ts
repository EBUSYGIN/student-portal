import axios from 'axios';

export const refreshTokens = async () => {
  await axios.get('', {
    withCredentials: true,
  });
};
