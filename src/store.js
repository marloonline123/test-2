import { configureStore } from "@reduxjs/toolkit";
import weatherSliceReducer from "./weatherSlice";

const Store = configureStore({
  reducer: {
    weather: weatherSliceReducer,
  },
});

export default Store;
