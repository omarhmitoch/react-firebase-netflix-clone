import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Store - Globalized State
/* For example , the global state of a counter ( initial a number with a 0 for example */

/*  for the action - for example the action of imcrementing the number located in the global state */

/* Reducer -  describes how your actions transform your state into another state */

/* Dispatch - distpatch the action to the reducer, then the reducer checks the action to do , the the store gets updated  */

const initialState = {
  user: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
