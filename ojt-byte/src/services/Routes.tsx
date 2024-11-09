import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const Routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },

    {
        path: "/",
        element: <LoginPage />,
    },

    
]);

export default Routes;