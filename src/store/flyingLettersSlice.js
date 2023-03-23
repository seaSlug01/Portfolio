import {createSlice} from "@reduxjs/toolkit";

const flyingLettersSlice = createSlice({
  name: "flyingLetters",
  initialState: {
    letters: {}
  },
  reducers: {
    setFlyingLetters: (state, action) => {
      state.letters = {...state.letters, [action.payload.id]: action.payload}
    },
    removeLetter: (state, action) => {
      const id = action.payload.id;
      let letters = state.letters
      delete letters[id];
      state.letters = letters
    }
  }
})

export const setFlyingLetters = flyingLettersSlice.actions.setFlyingLetters;
export const removeLetter = flyingLettersSlice.actions.removeLetter;
export default flyingLettersSlice.reducer;