import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login Page/LoginPage";
import MainPage from "../pages/Main Page/MainPage";
import Home from "../pages/Home Page/Home";
import UploadRequirements from "../pages/Upload Req Page/UploadRequirements";
import EditPage from "../pages/Edit Page/EditPage";
import LetterPage from "../pages/Letter Page/EndorsementLetter"

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
        element: <Home />, // Home Page
      },
      {
        path: "upload",
        element: <UploadRequirements />,
      },
      {
        path: "edit",
        element: <EditPage />
      },
      {
        path: "letter",
        element: <LetterPage />
      }
    ],
  },
]);

export default Routes;
