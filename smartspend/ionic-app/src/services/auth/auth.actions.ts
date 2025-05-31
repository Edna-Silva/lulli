import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthModel, AuthenticationResponseModel } from "./auth.model";
import { useGetUserQuery } from "../backend";
import storage from "../../redux/store";

import axios from "axios";

const backendURL = "http://localhost:8000/api";
export const login = createAsyncThunk(
  "auth/login",
  async (payload: AuthModel, { rejectWithValue }) => {
    try {
      const config: any = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/authenticate/token/`,
        { email: payload.email, password: payload.password },
        config
      );

      if (data) {
        const tokens = data;

        localStorage.setItem("tokens", JSON.stringify(tokens));
        await storage.set("tokens", JSON.stringify(tokens));
        return tokens;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const checkUserSession = createAsyncThunk(
  "auth/checkUserSession",
  async (_, { rejectWithValue }) => {
    try {
      const session = localStorage.getItem("tokens") ? true : false;
      return session;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
