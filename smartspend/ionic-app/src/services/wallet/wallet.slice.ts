import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: null as any,
  wallets: [],
  currentWallet: {},
  fromWallet: {},
  toWallet: {}
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setCurrentWallet: (state, {payload}) => {
      state.currentWallet = payload
    },
    setWallets: (state, { payload }) => {
      state.wallets = payload;
    },
    setFromWallet: (state, { payload }) => {
      state.fromWallet = payload;
    },
    setToWallet: (state, { payload }) => {
      state.toWallet = payload;
    },
  },
});

export const { setCurrentWallet, setWallets, setFromWallet, setToWallet} = walletSlice.actions;
export default walletSlice;