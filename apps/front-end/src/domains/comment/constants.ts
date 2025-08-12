import { getApiBaseUrl } from '@frontend/utils/api-config';

export const POST_METHOD = 'POST';
export const DELETE_METHOD = 'DELETE';
export const PATCH_METHOD = 'PATCH';
export const GET_METHOD = 'GET';

export const API_COMMENTS = () => `${getApiBaseUrl()}/comments`;
