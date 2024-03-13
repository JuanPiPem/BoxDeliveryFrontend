import { createSlice } from "@reduxjs/toolkit";

export const checkedPackages = createSlice({
  name: "checkedPackages",
  initialState: [] as string[],
  reducers: {
    setCheckedPackages: (state, action) => {
      const packageId = action.payload.id;
      const index = state.findIndex((id) => id === packageId);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(packageId);
      }
    },
  },
});

export const { setCheckedPackages } = checkedPackages.actions;

export default checkedPackages.reducer;
