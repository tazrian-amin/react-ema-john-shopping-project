import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Shop from '../components/Shop/Shop';
import Orders from '../components/Orders/Orders';
import Inventory from '../components/Inventory/Inventory';
import About from '../components/About/About';
import { productsAndCartLoader } from '../loaders/productsAndCartLoader';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Shipping from '../components/Shipping/Shipping';
import PrivateRoute from '../routes/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Shop></Shop>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/orders',
                loader: productsAndCartLoader,
                element: <Orders></Orders>
            },
            {
                path: '/inventory',
                element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
            },
            {
                path: '/shipping',
                element: <PrivateRoute><Shipping></Shipping></PrivateRoute>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
]);