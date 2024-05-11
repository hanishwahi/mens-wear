import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './Slices/ProductSlice'

const store = configureStore({
    reducer: cartSlice
})

export default store