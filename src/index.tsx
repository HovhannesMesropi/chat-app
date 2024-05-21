import ReactDOM from 'react-dom/client';
import './main.scss';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import axios from 'axios';

import { Accounts } from './pages/Accounts';
import { Register } from './pages/Accounts/Register';
import { Display } from './pages/Display';

const rootDOMElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDOMElement);



export const router = createBrowserRouter([
    {
        path: "/accounts",
        element: <Accounts />,
    },
    {
        path: "/accounts/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Display />,
    },
]);

axios.interceptors.request.use(function (config) {
    config.baseURL = "http://localhost:3001"
    if(localStorage.getItem('token')) {
        config.headers['auth'] = localStorage.getItem('token');
    }
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
    if(error.response.status === 400) {
        console.log(1234);
        router.navigate('/accounts')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


root.render(<RouterProvider router={router} />);