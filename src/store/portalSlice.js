import {createSlice} from "@reduxjs/toolkit";

const portalSlice = createSlice({
  name: "portal",
  initialState: {
    show: false,
    component: null,
    cordinates: {
      left: 0,
      right: 0,
      duration: null
    }
  },
  reducers: {
    togglePortal: (state, action) => {
      state = action.payload;
      return state;
    }
  }
})

export const togglePortal = portalSlice.actions.togglePortal;
export default portalSlice.reducer;