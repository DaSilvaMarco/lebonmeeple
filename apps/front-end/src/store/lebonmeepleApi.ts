import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lebonmeepleApi = createApi({
  reducerPath: 'lebonmeepleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: () => ({}),
  tagTypes: ['Posts'],
  keepUnusedDataFor: 1,
  refetchOnMountOrArgChange: true,
});
