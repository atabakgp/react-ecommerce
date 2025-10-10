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
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Dashboard from "@/pages/dashboard/dashboard";
import Orders from "@/pages/dashboard/orders";
import Profile from "@/pages/profile/Profile";
import Listing from "@/pages/listing/listing";
import Detail from "@/pages/detail/detail";
import Cart from "@/pages/cart/cart";
import Favorites from "@/pages/favorites/favorites";
import Checkout from "@/pages/checkout/checkout";
import Success from "@/pages/checkout/success";

import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";

import { getCategories } from "@/services/products/productService";

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
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          // Avoid refetching categories when only the search params (e.g., ?page=) change
          return currentUrl.pathname !== nextUrl.pathname;
        },
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
              {
                path: "orders",
                Component: Orders,
              },
            ],
          },
        ],
      },
    ],
  },
]);
