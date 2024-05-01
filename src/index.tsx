import ReactDOM from 'react-dom/client';
import './main.scss';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import axios from 'axios';

import { Accounts } from './pages/Accounts';
import { Register } from './pages/Accounts/Register';
import { Main } from './pages/Main';
import { Display } from './pages/Display';

const rootDOMElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDOMElement);

axios.interceptors.request.use(function (config) {
    config.baseURL = "http://localhost:3001"
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/accounts",
        element: <Accounts />,
    },
    {
        path: "/accounts/register",
        element: <Register />,
    },
    {
        path: "/display",
        element: <Display />,
    },
]);


root.render(<RouterProvider router={router} />);