import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home"
import Login from './pages/Login'
import Error404 from "./pages/Error404";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home /> 
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/register",
        element: <Register />
    },
    {
        path: "*",
        element: <Error404 />
    },
    
])

export default router