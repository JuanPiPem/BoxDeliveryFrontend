import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/user";
//import elementsReducer from "./elements";

const store = configureStore({
  reducer: {
    user: userReducer,
    //elements: elementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
