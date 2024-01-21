import { configureStore } from "@reduxjs/toolkit";
import portalSlice from "./portalSlice";
import projectsSlice from "./projectsSlice";
import flyingLettersSlice from "./flyingLettersSlice";
import mediaQuerySlice from "./mediaQuerySlice";
import themeSlice from "./themeSlice";
import setIntervalSlice from "./setIntervalSlice";

export const store = configureStore({
    reducer: {
        portal: portalSlice,
        projects: projectsSlice,
        flyingLetters: flyingLettersSlice,
        mediaQuerySize: mediaQuerySlice,
        theme: themeSlice,
        intervals: setIntervalSlice
    }
})