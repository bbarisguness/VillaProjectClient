"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  isHamburgerMenuActive: false,
  reservationStartDate: "",
  reservationEndDate: "",
  numberOfAdults: 0,
  numberOfChild: 0,
  numberOfBabies: 0,
  reservationFilter: "",
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    changeHamburgerMenuState: (state, action) => {
      state.isHamburgerMenuActive = !state.isHamburgerMenuActive;
    },
    changeDate: (state, action) => {
      state.reservationStartDate = action.payload.start
      state.reservationEndDate = action.payload.end
    },
    changeNumberOfPeople: (state, action) => {
      state.numberOfAdults = action.payload.adult;
      state.numberOfChild = action.payload.child;
      state.numberOfBabies = action.payload.baby;
    },
    changeReservationFilter: (state, action) => {
      state.reservationFilter = action.payload;
    },
  },
});

export const {
  changeLang,
  changeHamburgerMenuState,
  changeDate,
  changeNumberOfPeople,
  changeReservationFilter,
} = globalState.actions;
export default globalState.reducer;