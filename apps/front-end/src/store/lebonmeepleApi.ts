import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from '@/utils/api-config';

export const lebonmeepleApi = createApi({
  reducerPath: 'lebonmeepleApi',
  baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ['Posts'],
  keepUnusedDataFor: 1,
  refetchOnMountOrArgChange: true,
});
