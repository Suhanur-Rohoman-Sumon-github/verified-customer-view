import { baseApi } from "@/redux/api/baseApi";

const ssnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSSns: builder.query({
      query: (filters) => {
        // Convert filters object to query string
        const queryString = new URLSearchParams(
          Object.entries(filters || {})
            .filter(([_, value]) => value !== "" && value !== undefined)
            .map(([key, value]) => [key, String(value)])
        ).toString();

        return {
          url: `/ssns?${queryString}`,
          method: "GET",
        };
      },
    }),
  buySSn: builder.mutation({
  query: ({ ssnId, userId, price }) => ({
    url: `/ssns/buy`,
    method: "PATCH",
    body: { ssnId, userId, price },
  }),
  invalidatesTags: (_result, _error, { userId }) => [
    { type: "User", id: `BALANCE-${userId}` }, 
  ],
}),

    getMySsn: builder.query({
      query: (userId) => ({
        url: `/ssns/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSSnsQuery,useBuySSnMutation ,useGetMySsnQuery} = ssnApi;
