export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://api.lebonmeeple.online';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
};
