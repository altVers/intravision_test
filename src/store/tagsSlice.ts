import { fetchTags } from "@/api/fetchTags";
import { TTags } from "@/types/TTag";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTagsAsync = createAsyncThunk<TTags, void>(
  "tags/fetchTags",
  async () => {
    const tags = await fetchTags();
    return tags;
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [] as TTags,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(fetchTagsAsync.rejected, (_, action) => {
        console.error("Error fetching tags:", action.error);
      });
  },
});

export default tagsSlice.reducer;
