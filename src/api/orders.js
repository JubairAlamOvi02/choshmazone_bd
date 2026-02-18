import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders/create.php`, orderData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};
