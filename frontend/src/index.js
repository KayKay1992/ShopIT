import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import {HelmetProvider} from 'react-helmet-async'
import store from "./store";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./Components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./Components/AdminRoute";
import OrderListScreen from "./screens/adminScreen/OrderListScreen";
import ProductListScreen from "./screens/adminScreen/ProductListScreen";
import ProductEditSreen from "./screens/adminScreen/ProductEditSreen";
import UserListScreen from "./screens/adminScreen/UserListScreen";
import UserEditScreen from "./screens/adminScreen/UserEditScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Add more routes here */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderDetailScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/orderlist/:pageNumber" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditSreen />} />
        <Route path="/admin/userList" element={<UserListScreen />} />
        <Route path="/admin/userList/:pageNumber" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </HelmetProvider>
    
  </React.StrictMode>
);

reportWebVitals();
