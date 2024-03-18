import { createSlice } from "@reduxjs/toolkit";

export const currentPackage = createSlice({
  name: "currentPackage",
  initialState: {
    id: null,
    receiver_name: "",
    date: "",
    weight: "",
    address: "",
    status: "",
    user_id: "",
  },
  reducers: {
    setCurrentPackage: (state, action) => {
      state.id = action.payload.id;
      state.receiver_name = action.payload.receiver_name;
      state.date = action.payload.date;
      state.weight = action.payload.weight;
      state.address = action.payload.address;
      state.status = action.payload.status;
      state.user_id = action.payload.user_id;
    },
    removePackage: (state) => {
      state.id = null;
      state.receiver_name = "";
      state.date = "";
      state.weight = "";
      state.address = "";
      state.status = "";
      state.user_id = "";
    },
  },
});

export const { setCurrentPackage, removePackage } = currentPackage.actions;

export default currentPackage.reducer;
