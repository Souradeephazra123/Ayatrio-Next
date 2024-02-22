import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category:{},
  room: {},
  budget: {},
  color: {},
    selectiveproduct: {},
    style: {},
};

const selectedDataSlice = createSlice({
  name: 'selectedData',
  initialState,
  reducers: {
    setSelectedRoom(state, action) {
      state.room = action.payload;
    },
    setSelectedBudget(state, action) {
      state.budget = action.payload;
    },
    setSelectedColor(state, action) {
        // console.log('action', action);

      state.color = action.payload;
      // console.log('color', state.color);
    },
    setSelectedSelectiveProduct(state, action) {
      state.selectiveproduct = action.payload;
    },
    setSelectedStyle(state, action) {
      state.style = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const {
  setSelectedRoom,
  setSelectedBudget,
  setSelectedColor,
  setSelectedSelectiveProduct,
  setSelectedStyle,
  setCategory,
} = selectedDataSlice.actions;

export const selectRoom = (state) => state.virtualData.room;
export const selectBudget = (state) => state.virtualData.budget;
export const selectColor = (state) => state.virtualData.color;
export const selectSelectiveProduct = (state) => state.virtualData?.selectiveproduct;
export const selectStyle = (state) => state.virtualData.style;
export const selectCategory = (state) => state.virtualData.category;
export const selectData = (state) => state.virtualData;
export const allSelectedData = (state) => state.virtualData;

export default selectedDataSlice.reducer;
