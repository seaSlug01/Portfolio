import {createSlice } from "@reduxjs/toolkit";

// const intervals = {
//   "intervalName": {
//      delay: 0,
//      isRunning: true
//   }
// }

const intervalSlice = createSlice({
  name: "interval",
  initialState: {},
  reducers: {
    setIsRunning: (state, action) => {
      state[action.payload.name] = {...state[action.payload.name], isRunning: action.payload.isRunning};
      return state;
    },
    addInterval: (state, action) => {
      if(state[action.payload.name]) return console.error("This interval name already exists, if you're in development mode, React.StrictMode causes double rendering to identify errors, but if you're in production, this message may warn you that you're overwriting an existing setInterval. In either case, please make sure there are no unwanted re-renderings or duplicate intervals.")

      state[action.payload.name] = { isRunning: true, delay: action.payload.delay}
      return state;
    }  
  }
})

export const setIsRunning = intervalSlice.actions.setIsRunning;
export const addInterval = intervalSlice.actions.addInterval;
export default intervalSlice.reducer;