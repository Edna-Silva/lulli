import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: null as any,
  transactions: [],
  currentTransaction: {},
};

const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setCurrentTransaction: (state, {payload}) => {
      state.currentTransaction = payload
    },
    setTransactions: (state, { payload }) => {
      state.transactions = payload;
    }
  },
});

export const { setCurrentTransaction, setTransactions} = transactionSlice.actions;
export default transactionSlice;