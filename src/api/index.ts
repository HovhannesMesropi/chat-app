import axios from 'axios'


export const API = {
    login: async (nickname: string, password: string) => {
        const response = await axios.post('/accounts/sign-in', { data: { nickname, password } })

        localStorage.setItem('token', response.data.token);

        return response.data
    }
}