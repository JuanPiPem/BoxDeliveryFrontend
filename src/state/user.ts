import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: "",
    name: "",
    last_name: "",
    profile_photo: "",
    is_admin: false,
    is_confirmed: false,
    is_enabled: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.last_name = action.payload.last_name;
      state.profile_photo = action.payload.profile_photo;
      state.is_admin = action.payload.is_admin;
      state.is_confirmed = action.payload.is_confirmed;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
