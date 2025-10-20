/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, createApi, fetchBaseQuery, FetchArgs, BaseQueryApi, DefinitionType } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_PUBLIC_BASE_API_LOCAL ,
  
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


// BaseQueryFn type with no refresh token logic
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const baseQueryWithoutRefresh = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logOut());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithoutRefresh,
  endpoints: () => ({}),
  tagTypes: ['User','VerificationCode',"Category","SSN","Cart"],
});

function logOut(): any {
  throw new Error('Function not implemented.');
}
