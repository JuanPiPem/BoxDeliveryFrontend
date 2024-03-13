import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/user";
import checkedPackagesReducer from "../state/packages";
//import elementsReducer from "./elements";

const store = configureStore({
  reducer: {
    user: userReducer,
    checkedPackages: checkedPackagesReducer,
    //elements: elementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
