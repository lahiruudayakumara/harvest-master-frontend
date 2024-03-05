import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth/admin/login";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    // {
    //     path: "/farmer",
    //     children: [
    //         {
    //             index: true,
    //             Component: Home,
    //         },
    //     ]
    // },
    // {
    //     path: "/buyer",
    //     children: [
    //         {
    //             index: true,
    //             Component: Home,
    //         },
    //     ]
    // },
    // {
    //     path: "/admin",
    //     children: [
    //         {
    //             index: true,
    //             Component: Home,
    //         },
    //     ]
    // },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "*",
        Component: NotFoundPage
    },
]);
