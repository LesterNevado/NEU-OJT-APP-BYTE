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
    element: <LoginPage />, 
  },
  {
    path: "/main",
    element: <MainPage />, 
    children: [
      {
        index: true, 
        element: <HomePage />, 
      },
      {
        path: "upload",
        element: <UploadPage />, 
      },
      {
        path: "edit",
        element: <EditPage /> 
      }
    ],
  },
]);

export default Routes;
