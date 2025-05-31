import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.actions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  error: null as any,
  user: {},
  is_onboarded: false,
  userToken,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = {};
      state.userToken = null;
      state.success = false;
    },
    setCredentials: (state, { payload }) => {
      state.user = payload;
    },
    onboardUser: (state) => {
      state.is_onboarded = true
    }
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(login.fulfilled, (state, action)=>{
      state.loading = false;
      state.success = true;
      state.userToken = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.success = false;
      state.error = action.error.message
    })
  },
});

export const { setCredentials, logout, onboardUser } = authSlice.actions;
export default authSlice;