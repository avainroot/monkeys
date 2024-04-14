import { configureStore } from "@reduxjs/toolkit";
import { shopSlice } from "./reducers/shopSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      shop: shopSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
