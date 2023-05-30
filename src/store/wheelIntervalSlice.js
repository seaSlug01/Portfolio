import {createSlice} from "@reduxjs/toolkit";

const wheelIntervalSlice = createSlice({
  name: "mediaQuery",
  initialState: {
    isRunning: true
  },
  reducers: {
    setIsRunning: (state, action) => {
      state = {isRunning: action.payload};
      return state;
    }
  }
})

export const setIsRunning = wheelIntervalSlice.actions.setIsRunning;
export default wheelIntervalSlice.reducer;