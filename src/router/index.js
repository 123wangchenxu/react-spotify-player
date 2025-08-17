import { createBrowserRouter, Navigate } from "react-router-dom";
import Browse from '../Pages/Browse/index'
import RecentlyPlayed from '../Pages/Recently/index'
import Songs from '../Pages/Songs/index'
import Albums from "../Pages/Albums/idnex";
import Artists from "../Pages/Artists/index"
import App from "../App";
import Listen from "../Pages/Listen";
import Login from "../Pages/Login";
const router = createBrowserRouter([
  {
    path:'/',
    element:<Navigate to="/login"/>
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "browse", element: <Browse /> },
      { path: "recentlyplayed", element: <RecentlyPlayed /> },
      { path: "songs", element: <Songs /> },
      { path: "albums", element: <Albums /> },
      { path: "artists", element: <Artists /> },
    ],
  },
  {
    path:"/listen/:id",
    element:<Listen/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);
export default router;
