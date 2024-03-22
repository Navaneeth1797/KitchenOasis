import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import ProductDetails from "../product/productDetails";
import SearchProduct from "../product/searchProduct";
import Login from "../auth/login";
import Register from "../auth/register";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassowrd from "../auth/ResetPassowrd";
import Cart from "../cart/cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import ConfirmPayment from "../cart/confirmPayment";
import MyOrders from "../order/MyOrders";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/Invoice";
import Products from "../Products";
import About from "../About";



const userRoutes = () => {
  
  return (
    <>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>

      <Route path="/products" element={<Products />}></Route>
      <Route path="/products/:id" element={<ProductDetails />}></Route>
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassowrd />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/my/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/update" element={<UpdateProfile />} />
      <Route path="/password/update" element={<UpdatePassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmOrder"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmPayment"
        element={
          <ProtectedRoute>
            <ConfirmPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice/order/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      
    </>
  );
};

export default userRoutes;
