import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  error: null as any,
  statistics: [],
  currentStatistic: {},
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setCurrentStatistic: (state, {payload}) => {
      state.currentStatistic = payload
    },
    setStatistics: (state, {payload}) => {
      state.statistics = payload
    }
  },
});

export const { setCurrentStatistic, setStatistics } = statisticSlice.actions;
export default statisticSlice;