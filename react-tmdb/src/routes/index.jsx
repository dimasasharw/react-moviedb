import { Outlet, createBrowserRouter } from "react-router-dom"
import Navbar from "../components/Navbar"
import Home from "../views/home"
import Favorite from "../views/favorite"
import Watchlist from "../views/watchlist"
import DetailMovie from "../views/detailMovie"
import LoginPage from "../views/loginPage"

const Router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <Outlet />
            </>
        ),
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'favorite',
                element: <Favorite />
            },
            {
                path: 'watchlist',
                element: <Watchlist />
            },
            {
                path: 'movie/:id',
                element: <DetailMovie />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }
])

export default Router