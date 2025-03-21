import { fetchUsers } from "@/api/fetchUsers";
import { TUsers } from "@/types/TUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsersAsync = createAsyncThunk<TUsers, void>(
  "users/fetchUsers",
  async () => {
    const users = await fetchUsers();
    return users;
  }
);

const usersSlice = createSlice({
  name: "Users",
  initialState: {
    users: [] as TUsers,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (_, action) => {
        console.error("Error fetching Users:", action.error);
      });
  },
});

export default usersSlice.reducer;
