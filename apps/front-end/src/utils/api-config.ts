export const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return 'http://lebonmeeple.online/api';
  }

  if (typeof window !== 'undefined') {
    return 'http://localhost:3000';
  }

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.DOCKER_ENV === 'true'
  ) {
    return 'http://backend:3000';
  }

  return 'http://localhost:3000';
};
