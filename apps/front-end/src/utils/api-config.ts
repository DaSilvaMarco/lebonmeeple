export const getApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window === 'undefined') {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.DOCKER_ENV === 'true'
    ) {
      return 'http://app:3000';
    }
    return 'http://localhost:3000';
  }
  return 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();
