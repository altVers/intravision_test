import { fetchPriorities } from "@/api/fetchPriorities";
import { TPriorities } from "@/types/TPriority";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPrioritiesAsync = createAsyncThunk<TPriorities, void>(
  "priorities/fetchPriorities",
  async () => {
    const priorities = await fetchPriorities();
    return priorities;
  }
);

const prioritiesSlice = createSlice({
  name: "priorities",
  initialState: {
    priorities: [] as TPriorities,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrioritiesAsync.fulfilled, (state, action) => {
        state.priorities = action.payload;
      })
      .addCase(fetchPrioritiesAsync.rejected, (_, action) => {
        console.error("Error fetching priorities:", action.error);
      });
  },
});

export default prioritiesSlice.reducer;
