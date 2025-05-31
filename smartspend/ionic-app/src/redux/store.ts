//import IonicSecureStorageDriver from "@ionic-enterprise/secure-storage/driver";
import { Drivers, Storage } from "@ionic/storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../services/auth/auth.slice";
import walletSlice from "../services/wallet/wallet.slice";
import transactionSlice from "../services/transaction/transaction.slice";
import statisticSlice from "../services/statistic/statistic.slice";
import { smartSpendAPI } from "../services/backend";

const storage = new Storage({
  name: "__smartspendStorage",
  driverOrder: [Drivers.IndexedDB, Drivers.SecureStorage, Drivers.LocalStorage],
});

//storage.defineDriver(IonicSecureStorageDriver);
storage.create();

export default storage;


// apis and slices


const reducers = combineReducers({
  [smartSpendAPI.reducerPath]: smartSpendAPI.reducer,
  auth: authSlice.reducer,
  wallet: walletSlice.reducer,
  transaction: transactionSlice.reducer,
  statistic: statisticSlice.reducer
  // supervisor: supervisorSlice.reducer
});



export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([smartSpendAPI.middleware]),
});

async function loadStateFromStorage() {
  try {
    const serializedState = await storage.get("state");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Error loading state from storage:", err);
    return undefined; // Or return a default initial state
  }
}


