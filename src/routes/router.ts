import {
  createBrowserRouter,
  useLoaderData,
  useActionData,
  Form,
} from "react-router-dom";
import App from "../App";
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Profile from "@/pages/Profile/Profile";
import Listing from "@/pages/Listing/Listing";
import Detail from "@/pages/Detail/Detail";
import Cart from "@/pages/Cart/Cart";
import Favorites from "@/pages/Favorites/Favorites";
import Checkout from "@/pages/Checkout/Checkout";
import Success from "@/pages/Checkout/Success";

import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

import { getCategories } from "@/services/productService";

export async function fetchCategoriesLoader() {
  const categories = await getCategories();
  return categories;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: MainLayout,
        loader: fetchCategoriesLoader,
        id: "mainLayout",
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "category/:categorySlug",
            Component: Listing,
          },
          {
            path: "/:brand?/:title/:productId",
            Component: Detail,
          },
          {
            path: "cart",
            Component: PrivateRoute,
            children: [
              {
                index: true,
                Component: Cart,
              },
            ],
          },
          {
            path: "checkout",
            Component: PrivateRoute,
            children: [
              {
                index: true,
                Component: Checkout,
              },
              {
                path: "success",
                Component: Success,
              },
            ],
          },
          {
            path: "favorites",
            Component: PrivateRoute,
            children: [
              {
                index: true,
                Component: Favorites,
              },
            ],
          },
        ],
      },

      {
        Component: PublicRoute,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
      {
        path: "dashboard",
        Component: PrivateRoute,
        children: [
          {
            Component: DashboardLayout,
            children: [
              {
                index: true,
                Component: Dashboard,
              },
              {
                path: "profile",
                Component: Profile,
              },
            ],
          },
        ],
      },
    ],
  },
]);
