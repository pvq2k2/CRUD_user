import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getUsers,
  readUser,
  removeUser,
  updateUser,
} from "../../services/usersService";

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  errorMessage: "",
};

export const getAll = createAsyncThunk("user/getUsers", async () => {
  const response = await getUsers();
  return response;
});
export const read = createAsyncThunk("user/readUser", async (id) => {
  const response = await readUser(id);
  return response;
});

export const remove = createAsyncThunk("user/removeUser", async (id) => {
  const response = await removeUser(id);
  return response;
});

export const update = createAsyncThunk("user/updateUser", async (user) => {
  const response = await updateUser(user);
  return response;
});

export const create = createAsyncThunk("user/createUser", async (user) => {
  const response = await createUser(user);
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAll
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getAll.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
    // read
    builder.addCase(read.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(read.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(read.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
    //delete
    builder.addCase(remove.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.filter((item) => item.id !== action.payload);
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
    //update
    builder.addCase(update.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
    builder.addCase(update.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
    //create
    builder.addCase(create.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.push(action.payload);
    });
    builder.addCase(create.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
