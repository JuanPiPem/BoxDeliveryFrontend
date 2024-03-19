import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/user";
import { reducers } from "../state/packages";
//import elementsReducer from "./elements";

const store = configureStore({
  reducer: {
    user: userReducer,
    currentPackage: reducers.currentPackage,
    pendigPackages: reducers.pendingPackages,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
