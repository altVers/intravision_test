import { createSlice } from "@reduxjs/toolkit";

const drawersSlice = createSlice({
  name: "drawers",
  initialState: {
    addTaskDrawerState: false,
    editTaskDrawerState: false,
  },
  reducers: {
    toggleAddTaskDrawer: (state, action) => {
      state.addTaskDrawerState = action.payload;
      if(state.editTaskDrawerState) {
        state.editTaskDrawerState = false
      }
    },
    toggleEditTaskDrawer: (state, action) => {
      state.editTaskDrawerState = action.payload;
      if(state.addTaskDrawerState) {
        state.addTaskDrawerState = false
      }
    },
  },
});

export const { toggleAddTaskDrawer, toggleEditTaskDrawer } =
  drawersSlice.actions;
export default drawersSlice.reducer;
