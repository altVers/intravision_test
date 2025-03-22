import { addTask } from "@/api/addTask";
import { editTask } from "@/api/editTask";
import { fetchTask } from "@/api/fetchTask";
import { fetchTasks } from "@/api/fetchTasks";
import { TEditedTask, TNewTask, TTask, TTasks } from "@/types/TTask";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasksAsync = createAsyncThunk<TTasks, void>(
  "tasks/fetchTasks",
  async () => {
    const tasks = await fetchTasks();
    return tasks;
  }
);

export const addTaskAsync = createAsyncThunk<TTask, TNewTask>(
  "tasks/addTask",
  async (task) => {
    const newTaskId = await addTask(task);
    const taskById = await fetchTask(newTaskId);
    return taskById;
  }
);

export const editTaskAsync = createAsyncThunk<TTask, TEditedTask>(
  "tasks/editTask",
  async (task) => {
    await editTask(task);
    const taskById = await fetchTask(task.id);
    return taskById;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as TTasks,
    editedTask: {} as TTask,
    taskStatus: "idle",
  },
  reducers: {
    setEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.taskStatus = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        console.error("Error fetching:", action.error);
      })
      .addCase(addTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks = [...state.tasks, action.payload];
        state.taskStatus = "succeeded";
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        console.error("Error fetching:", action.error);
      })
      .addCase(editTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.taskStatus = "succeeded";
      })
      .addCase(editTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        console.error("Error fetching:", action.error);
      });
  },
});

export const { setEditedTask } = tasksSlice.actions;

export default tasksSlice.reducer;
