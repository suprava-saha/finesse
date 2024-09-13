import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "./index.css";
import Menu from "./pages/Menu/Menu.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Home from "./pages/Home/Home.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import PlaceOrder from "./pages/PlaceOrder/PleaceOrder.jsx";
import Verify from "./pages/Verify/Verify.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menus",
        element: <Menu></Menu>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/order",
        element: <PlaceOrder></PlaceOrder>,
      },
      {
        path: "/verify",
        element: <Verify></Verify>,
      },
      {
        path: "/myorders",
        element: <MyOrders></MyOrders>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </React.StrictMode>
);
