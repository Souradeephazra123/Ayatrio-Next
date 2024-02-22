import { createSlice } from "@reduxjs/toolkit";

const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState: {
    filteredproductitem: [],
  },
  // reducers: (state, action) => {
  //   state.setFilteredProduct = action.payload;
  // },
  reducers: {
    setFilteredProduct: (state, action) => {
      state.filteredproductitem = action.payload;
    },
  },
});

export const { setFilteredProduct } = filteredProductSlice.actions;

export const selectedFilteredProduct = (state) =>
  state.filteredProduct.filteredproductitem;
export default filteredProductSlice.reducer;
