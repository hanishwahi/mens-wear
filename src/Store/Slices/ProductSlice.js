import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart slice',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            state.cart.push(item);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item, index) => index !== action.payload);
        },
        removeAllItems: (state, action) => {
            state.cart = []
        },
    }
});

export const { addToCart, removeFromCart, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
