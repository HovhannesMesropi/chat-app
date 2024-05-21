export const getPayload = () => {
    const token = localStorage.getItem('token');

    if(token) {
        const data = JSON.parse(atob(token.split('.')[1]));
        
        return data;
    }

    return false;
}