import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import AddCategory from "./pages/Category/Add/Add.jsx";
import ListCategory from "./pages/Category/List/List.jsx";
import AddItems from "./pages/Items/Add/Add.jsx";
import ListItems from "./pages/Items/List/List.jsx";
import SalesReport from "./pages/SalesReport/SalesReport.jsx";

const url = "http://localhost:4000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/add",
        element: <Add url={url}></Add>,
      },
      {
        path: "/list",
        element: <List url={url}></List>,
      },
      {
        path: "/orders",
        element: <Orders url={url}></Orders>,
      },
      {
        path: "/category/add",
        element: <AddCategory url={url}></AddCategory>,
      },
      {
        path: "/category/list",
        element: <ListCategory url={url}></ListCategory>,
      },
      {
        path: "/items/add",
        element: <AddItems url={url}></AddItems>,
      },
      {
        path: "/items/list",
        element: <ListItems url={url}></ListItems>,
      },
      {
        path: "/SalesReport",
        element: <SalesReport url={url}></SalesReport>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
