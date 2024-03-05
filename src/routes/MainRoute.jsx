import { RouterProvider } from "react-router-dom"
import { router } from "./path";

const MainRoute = () => {
  return <RouterProvider router={router} />;
}

export default MainRoute
