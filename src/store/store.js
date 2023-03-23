import { configureStore } from "@reduxjs/toolkit";
import portalSlice from "./portalSlice";
import projectsSlice from "./projectsSlice";
import flyingLettersSlice from "./flyingLettersSlice";
import mediaQuerySlice from "./mediaQuerySlice";

export const store = configureStore({
    reducer: {
        portal: portalSlice,
        projects: projectsSlice,
        flyingLetters: flyingLettersSlice,
        mediaQuerySize: mediaQuerySlice
    }
})