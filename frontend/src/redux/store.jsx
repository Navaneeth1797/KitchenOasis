import { configureStore, } from "@reduxjs/toolkit";
import { ProductApi } from "./api/ProductsApi";
import { AuthApi } from "./api/AuthApi";
import { UserApi } from "./api/UserApi";
import userReducer from "./features/UserSlice";
import cartReducer from "./features/CartSlice";
import { OrderApi } from "./api/OrderApi";



export let store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ProductApi.middleware,
      AuthApi.middleware,
      UserApi.middleware,
      OrderApi.middleware,
    ]),
});