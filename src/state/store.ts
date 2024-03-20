import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../state/user";
import currentPackageReducer from "../state/packages";
//import elementsReducer from "./elements";

const store = configureStore({
  reducer: {
    user: reducers.user,
    currentDeliveryMen: reducers.currentDeliveryMen,
    currentPackage: currentPackageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
