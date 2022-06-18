import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer
  }
});
