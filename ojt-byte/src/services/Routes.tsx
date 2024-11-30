import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login Page/LoginPage";
import MainPage from "../pages/Main Page/MainPage";

const Routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },

    {
        path: "/",
        element: <LoginPage />,
    },

    {
        path: "/main",
        element: <MainPage />,
    },

    
]);

export default Routes;