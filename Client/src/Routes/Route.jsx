import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Chat from "../Pages/Chat/Chat";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: '/register',
            element: <Register></Register>,
        },
        {
            path: '/login',
            element: <Login></Login>,
        },
        {
            path: '/chat',
            element: <Chat></Chat>,
        },
      ]
    },
  ]);

  export default router;