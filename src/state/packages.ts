import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Package {
  id: string;
  receiver_name: string;
  date: string;
  weight: string;
  address: string;
  status: string;
  user_id: string;
}

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

const initialState: Package[] = [];
export const pendingPackages = createSlice({
  name: "pendingPackages",
  initialState,
  reducers: {
    addPendingPackage: (state, action: PayloadAction<Package>) => {
      state.push(action.payload);
    },
    removePendingPackage: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    removePendingPackages: (state) => {
      return state.splice(0, state.length);
    },
    updatePendingPackage: (state, action: PayloadAction<Package>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setCurrentPackage, removePackage } = currentPackage.actions;
export const {
  addPendingPackage,
  removePendingPackage,
  removePendingPackages,
  updatePendingPackage,
} = pendingPackages.actions;

export const reducers = {
  currentPackage: currentPackage.reducer,
  pendingPackages: pendingPackages.reducer,
};
