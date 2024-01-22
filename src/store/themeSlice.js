import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
    prev: null,
  },
  reducers: {
    setTheme: (state, action) => {
      state = { ...action.payload }
      return state
    },
  },
})

export const setTheme = themeSlice.actions.setTheme
export default themeSlice.reducer
