import axios from 'axios';

// Creamos una instancia personalizada de Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api/fallas',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Petición GET: Obtener todas las fallas
export const getFallas = async () => {
    const response = await api.get('/');
    return response.data; // Axios guarda la respuesta del servidor en .data
};

// Petición POST: Crear una nueva falla
export const createFalla = async (falla) => {
    const response = await api.post('/', falla);
    return response.data;
};

// Petición PUT: Actualizar una falla existente
export const updateFalla = async (id, falla) => {
    const response = await api.put(`/${id}`, falla);
    return response.data;
};

// Petición DELETE: Eliminar una falla
export const deleteFalla = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};