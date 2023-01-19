import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFav: (state, action) => {
      if (
        !state.favList.some(
          (i) => i.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        state.favList = [...state.favList, action.payload];
      } else {
        state.favList = state.favList.filter(
          (i) => i.name.toLowerCase() !== action.payload.name.toLowerCase()
        );
      }
    },
    removeFav: (state, action) => {
      state.favList = state.favList.filter((_, idx) => idx !== action.payload);
    },
  },
});

export const { addFav, removeFav } = userSlice.actions;

export default userSlice.reducer;
