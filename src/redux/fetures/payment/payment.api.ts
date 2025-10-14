import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeAPayment: builder.mutation({
      query: (userInfo) => ({
        url: "/ssns/make-payment",
        method: "POST",
        body: userInfo,
      }),
     
    }),
 
  }),
});

export const {
useMakeAPaymentMutation
} = authApi;