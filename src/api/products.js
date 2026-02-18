const BASE_URL = '/api/products';

export const fetchProducts = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${BASE_URL}/list.php?${params}`);
    const result = await response.json();
    if (result.status === 'success') {
        return result.data;
    }
    throw new Error(result.message);
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/get.php?id=${id}`);
    const result = await response.json();
    if (result.status === 'success') {
        return result.data;
    }
    throw new Error(result.message);
};
