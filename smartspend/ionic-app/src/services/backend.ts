import { RootState, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthenticatedUserModel } from "./auth/auth.model";
import { getAccessToken } from './tokenAccessor';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/',
  //baseUrl: 'https://smartspend-two.vercel.app/api/',
  // baseUrl: 'https://7965-41-182-12-215.ngrok-free.app/api/',
  mode: 'cors',
  prepareHeaders: async (headers) => {
    const accessToken = await getAccessToken(); // Fetch the token
    if (accessToken) {
      
      headers.set('authorization', `Bearer ${accessToken}`);
      
    }
    return headers;
  },
});

export const smartSpendAPI = createApi({
  reducerPath: "smartspendAPI",
  baseQuery,
  keepUnusedDataFor: 5,
  tagTypes: [
    "Auth",
    "Wallet",
    "BankAccount",
    "Transaction",
    "Expense",
    "Income",
    "PlannedPayment",
    "Category",
    "Budget",
  ],

  endpoints: (builder) => ({
    signin: builder.mutation<any, any>({
      query: (body) => ({
        url: "authenticate/token/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.mutation<any, any>({
      query: (body) => ({
        url: "authenticate/token/refresh/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<AuthenticatedUserModel, void>({
      query: () => ({
        url: "authenticate/user",
        method: "GET",
      }),
    }),
    getCategory: builder.query<any, void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
    }),
    getWallets: builder.query<any, void>({
      query: () => ({
        url: "wallet",
        method: "GET",
      }),
    }),
    updateWallet: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/${body.account_number}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    addWallet: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    deleteWallet: builder.mutation<any, any>({
      query: (body) => ({
        url: `wallet/${body.id}`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    getBankAccounts: builder.query<any, void>({
      query: () => ({
        url: "bankaccount",
        method: "GET",
      }),
    }),
    updateBankAccounts: builder.mutation<any, any>({
      query: (body) => ({
        url: `bankaccount/${body.account_number}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["BankAccount"],
    }),
    addTransaction: builder.mutation<any, any>({
      query: (body) => ({
        url: `transaction/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Transaction"],
    }),
    getTransactions: builder.query<any, void>({
      query: () => ({
        url: "transaction",
        method: "GET",
      }),
    }),
    addExpense: builder.mutation<any, any>({
      query: (body) => ({
        url: `expense/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Expense"],
    }),
    addIncome: builder.mutation<any, any>({
      query: (body) => ({
        url: `income/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Income"],
    }),
    addPlannedPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: `plannedpayment/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["PlannedPayment"],
    }),
    updatePlannedPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: `plannedpayment/${body.id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["PlannedPayment"],
    }),
    deletePlannedPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: `plannedpayment/${body.id}`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["PlannedPayment"],
    }),
    getPlannedPayments: builder.query<any, void>({
      query: () => ({
        url: "plannedpayment",
        method: "GET",
      }),
    }),
    getStatistics: builder.query<any, void>({
      query: () => ({
        url: "statistic",
        method: "GET",
      }),
    }),
    addStatistics: builder.mutation<any, any>({
      query: (body) => ({
        url: "statistic/",
        method: "POST",
        body: body
      }),
    }),
    getBudgets: builder.query<any, void>({
      query: () => ({
        url: "budget",
        method: "GET",
      }),
    }),
    addBudget: builder.mutation<any, any>({
      query: (body) => ({
        url: `budget/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Budget"],
    }),
    updateBudget: builder.mutation<any, any>({
      query: (body) => ({
        url: `budget/${body.id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Budget"],
    }),
    deleteBudget: builder.mutation<any, any>({
      query: (body) => ({
        url: `budget/${body.id}`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Budget"],
    }),
    updateExpenditureBudget: builder.mutation<any, any>({
      query: (body) => ({
        url: `budget/expenditure/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Budget"],
    }),
    updateUser: builder.mutation<any, any>({
      query: (body) => ({
        url: `authenticate/user`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    
  }),
});

export const {
  useGetUserQuery,
  useSigninMutation,
  useRefreshTokenMutation,
  useGetWalletsQuery,
  useUpdateWalletMutation,
  useGetBankAccountsQuery,
  useUpdateBankAccountsMutation,
  useAddTransactionMutation,
  useAddExpenseMutation,
  useAddWalletMutation,
  useAddIncomeMutation,
  useAddPlannedPaymentMutation,
  useGetTransactionsQuery,
  useGetCategoryQuery,
  useGetStatisticsQuery,
  useGetPlannedPaymentsQuery,
  useGetBudgetsQuery,
  useAddBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useUpdateUserMutation,
  useDeleteWalletMutation,
  useUpdatePlannedPaymentMutation,
  useDeletePlannedPaymentMutation,
  useAddStatisticsMutation,
  useUpdateExpenditureBudgetMutation
} = smartSpendAPI;
