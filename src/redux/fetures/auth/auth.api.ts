import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
     
    }),
    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/ssn-user/register",
        method: "POST",
        body: userInfo,
      }),
    
      invalidatesTags: [{ type: "User", id: "ME" }],
    }),
   getMyBalance: builder.query({
  query: (userId) => ({
    url: `/ssn-user/${userId}`,
    method: "GET",
  }),
  providesTags: (_result, _error, userId) => [{ type: "User", id: `BALANCE-${userId}` }],
}),

    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "ME" }],
    }),
    verifyEmail: builder.query({
      query: (userEmail) => ({
        url: `/users/verification-code/${userEmail}`,
        method: "GET",
      }),
      providesTags: (result, error, userEmail) => [
        { type: "VerificationCode", id: userEmail },
      ],
    }),
    updateVerifiedUser: builder.mutation({
      query: (verificationCode) => ({
        url: `/users/verify-email`,
        method: "POST",
        body: { code: verificationCode },
      }),
     
      invalidatesTags: [{ type: "VerificationCode", id: "LIST" }, { type: "User", id: "ME" }],
    }),
    changePassword: builder.mutation({
      query: ({ userId, oldPassword, newPassword,email }) => ({
        url: `/ssn-user/change-password`,
        method: "PATCH",
        body: { userId, oldPassword, newPassword,email },
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetMeQuery,
  useVerifyEmailQuery,
  useUpdateVerifiedUserMutation,
  useGetMyBalanceQuery,
  useChangePasswordMutation,
} = authApi;