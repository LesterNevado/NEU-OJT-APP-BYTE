import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login Page/LoginPage";
import MainPage from "../pages/Main Page/MainPage";
import HomePage from "../pages/Home Page/HomePage";
import UploadPage from "../pages/Upload Page/UploadPage";
import EditPage from "../pages/Edit Page/EditPage";

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LoginPage />, // Redirect "/" to the Login Page
  },
  {
    path: "/main",
    element: <MainPage />, // MainPage serves as the layout
    children: [
      {
        index: true, // Default child route for "/main"
        element: <HomePage />, // Home Page
      },
      {
        path: "upload",
        element: <UploadPage />, // Upload Page
      },
      {
        path: "edit",
        element: <EditPage /> // Edit Page
      }
    ],
  },
]);

export default Routes;
