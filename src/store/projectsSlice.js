import {createSlice} from "@reduxjs/toolkit";
import { projects } from "../db";

const projectsSlice = createSlice({
  name: "project",
  initialState: {
    projectsData: projects,
    selectedProject: null
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload.id ? state.projectsData.find(p => p.id === action.payload.id) : null;
      return state
    }
  }
})

export const setSelectedProject = projectsSlice.actions.setSelectedProject;
export default projectsSlice.reducer;