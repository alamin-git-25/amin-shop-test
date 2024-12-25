import { configureStore } from "@reduxjs/toolkit";
import { baseUrl } from "./api/baseUrl";
import cartReducer from "./cart/cart";

export const store = configureStore({
    reducer: {
        [baseUrl.reducerPath]: baseUrl.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseUrl.middleware),
});