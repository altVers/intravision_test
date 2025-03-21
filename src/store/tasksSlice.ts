import { fetchTasks } from "@/api/fetchTasks";
import { TTasks } from "@/types/TTask";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasksAsync = createAsyncThunk<TTasks, void>(
  "tasks/fetchTasks",
  async () => {
    const tasks = await fetchTasks();
    return tasks;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as TTasks,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("Error fetching statuses:", action.error);
      });
  },
});

export default tasksSlice.reducer;
