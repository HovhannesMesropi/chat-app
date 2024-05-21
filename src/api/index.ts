import axios from 'axios'
import { router } from '../index';


export const API = {
    login: async (nickname: string, password: string) => {
        const response = await axios.post('/accounts/sign-in', { nickname, password }).catch((error) => error);

        localStorage.setItem('token', response.data.token);

        return response.data
    },
    getUsers: async () => {
        if (!localStorage.getItem('token')) {
            router.navigate('/accounts');
            return false;
        }

        const { data } = await axios.get('/accounts/list')

        return data;
    },
    directMessage: async (to: number, message: string) => {
        const response = await axios.post('/dialogs/direct', { to, message })

        console.log(response);

        return response;
    },
    getDirectMessages: async () => {
        return await axios.get('/dialogs/direct');
    }
}