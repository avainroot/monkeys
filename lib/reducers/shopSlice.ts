import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IShop = {
  cart: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    initialCart: (state: IShop, action: PayloadAction<IOrder[]>) => {
      return { ...state, ...{ cart: action.payload } };
    },
    addOrder: (state: IShop, action: PayloadAction<IOrder>) => {
      const hasOrder = state.cart.some(
        (order) => order.id === action.payload.id
      );

      const payload = hasOrder
        ? state.cart.map((order) =>
            order.id === action.payload.id
              ? { ...order, ...action.payload }
              : order
          )
        : [...state.cart, action.payload];

      localStorage.setItem("userCart", JSON.stringify(payload));

      return { ...state, ...{ cart: payload } };
    },
    deleteOrder: (state: IShop, action: PayloadAction<{ id: number }>) => {
      const cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("userCart", JSON.stringify(cart));
      return { ...state, ...{ cart } };
    },
    cleanCart: (state: IShop) => {
      localStorage.removeItem("userCart");
      return { ...state, ...{ cart: [] } };
    },
  },
});

export const { initialCart, addOrder, deleteOrder, cleanCart } =
  shopSlice.actions;
