import { getFromLocalStorage, setToLocalStorage } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: getFromLocalStorage('carts') || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
            } else {
                state.items.push({
                    productId,
                    quantity,

                });
            }
            setToLocalStorage("carts", state.items);
        },
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity;
            } else {
                state.items = (state.items).filter(item => item.productId !== productId);
            }
            setToLocalStorage("carts", state.items);
        },
        removeCart(state, action) {
            const { productId } = action.payload;
            state.items = (state.items).filter(item => item.productId !== productId);
            setToLocalStorage("carts", state.items);
        },

        clearCart(state) {
            state.items = [];
            setToLocalStorage("carts", state.items);
        },



    }
})
export const { addToCart, changeQuantity, removeCart, totalAmount, clearCart, setPrint, removePrint, } = cartSlice.actions;
export default cartSlice.reducer;