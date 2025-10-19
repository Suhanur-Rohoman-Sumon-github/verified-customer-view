import { baseApi } from "@/redux/api/baseApi";

const ssnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSSns: builder.query({
      query: (filters) => {
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
      providesTags: ["SSN"],
    }),

    buySSn: builder.mutation({
      query: ({ ssnId, userId, price }) => ({
        url: `/ssns/buy`,
        method: "PATCH",
        body: { ssnId, userId, price },
      }),
      invalidatesTags: (result, error, { userId }) => [
        "SSN",
        { type: "User", id: `BALANCE-${userId}` },
      ], 
    }),

    getMySsn: builder.query({
      query: (userId) => ({
        url: `/ssns/${userId}`,
        method: "GET",
      }),
      providesTags: ["SSN"], // ✅ Added
    }),
    getCart: builder.query({
      query: (userId: string) => ({
        url: `/ssn-user/cart/${userId}`,
        method: "GET",
      }),
   
    }),
  
    addToCart: builder.mutation({
      query: ({ userId, ssnIds }: { userId: string; ssnIds: string[] }) => ({
        url: `/ssn-user/cart/add`,
        method: "PUT",
        body: { userId, ssnIds },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    removeFromCart: builder.mutation({
      query: ({ userId, ssnIds }: { userId: string; ssnIds: string[] }) => ({
        url: `/ssn-user/cart/remove`,
        method: "PATCH",
        body: { userId, ssnIds },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});
export const {
  useGetSSnsQuery,
  useBuySSnMutation,
  useGetMySsnQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = ssnApi;
