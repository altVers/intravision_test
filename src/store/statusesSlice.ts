import { fetchStatuses } from "@/api/fetchStatuses";
import { TStatuses } from "@/types/TStatus";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchStatusesAsync = createAsyncThunk<TStatuses, void>(
  "statuses/fetchStatuses",
  async () => {
    const statuses = await fetchStatuses();
    return statuses;
  }
);

const statusesSlice = createSlice({
  name: "statuses",
  initialState: {
    statuses: [] as TStatuses,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatusesAsync.fulfilled, (state, action) => {
        state.statuses = action.payload;
      })
      .addCase(fetchStatusesAsync.rejected, (_, action) => {
        console.error("Error fetching statuses:", action.error);
      });
  },
});

export default statusesSlice.reducer;
