import {createSlice} from "@reduxjs/toolkit";


// sizes: large, medium, tablet, phone
const imageSizes = {
  4: "large",
  3: "medium",
  2: "medium",
  1: "small"
}

const mediaQuerySlice = createSlice({
  name: "mediaQuery",
  initialState: {
    mediaSize: 0,
    imageSize: ""
  },
  reducers: {
    setMediaQuerySize: (state, action) => {
      state = {mediaSize: action.payload.size, imageSize: imageSizes[action.payload.size]}
      return state;
    }
  }
})

export const setMediaQuerySize = mediaQuerySlice.actions.setMediaQuerySize;
export default mediaQuerySlice.reducer;