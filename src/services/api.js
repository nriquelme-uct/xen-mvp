// Configuración base de la API
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Función para obtener el token del localStorage
const getToken = () => {
    return localStorage.getItem('authToken');
};

// Función para hacer peticiones HTTP con autenticación
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Servicios de autenticación
export const authService = {
    login: async (username, password) => {
        return apiRequest('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },
    
    register: async (username, password) => {
        return apiRequest('/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },
    
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },
    
    isAuthenticated: () => {
        return !!getToken();
    },
    
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

// Servicios de comida
export const foodService = {
    getFoods: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/foods${queryString ? `?${queryString}` : ''}`);
    },
    
    getFoodById: async (id) => {
        return apiRequest(`/foods/${id}`);
    },
    
    createFood: async (foodData) => {
        return apiRequest('/foods', {
            method: 'POST',
            body: JSON.stringify(foodData),
        });
    },
    
    updateFood: async (id, foodData) => {
        return apiRequest(`/foods/${id}`, {
            method: 'PUT',
            body: JSON.stringify(foodData),
        });
    },
    
    deleteFood: async (id) => {
        return apiRequest(`/foods/${id}`, {
            method: 'DELETE',
        });
    },
    
    searchFoods: async (query, filters = {}) => {
        const params = { q: query, ...filters };
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/foods/search?${queryString}`);
    },
    
    getFoodStats: async () => {
        return apiRequest('/foods/stats');
    },
    
    getFoodsByCategory: async (category) => {
        return apiRequest(`/foods/category/${category}`);
    }
};

// Servicios de entrenamiento
export const trainingService = {
    getTrainings: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/trainings${queryString ? `?${queryString}` : ''}`);
    },
    
    getTrainingById: async (id) => {
        return apiRequest(`/trainings/${id}`);
    },
    
    createTraining: async (trainingData) => {
        return apiRequest('/trainings', {
            method: 'POST',
            body: JSON.stringify(trainingData),
        });
    },
    
    updateTraining: async (id, trainingData) => {
        return apiRequest(`/trainings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(trainingData),
        });
    },
    
    deleteTraining: async (id) => {
        return apiRequest(`/trainings/${id}`, {
            method: 'DELETE',
        });
    },
    
    completeTraining: async (id) => {
        return apiRequest(`/trainings/${id}/complete`, {
            method: 'PUT',
        });
    },
    
    searchTrainings: async (query, filters = {}) => {
        const params = { q: query, ...filters };
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/trainings/search?${queryString}`);
    },
    
    getTrainingStats: async () => {
        return apiRequest('/trainings/stats');
    },
    
    getTrainingsByClient: async (clientName) => {
        return apiRequest(`/trainings/client/${encodeURIComponent(clientName)}`);
    }
};

// Servicios de clientes
export const clientService = {
    getClients: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/clients${queryString ? `?${queryString}` : ''}`);
    },
    
    getClientById: async (id) => {
        return apiRequest(`/clients/${id}`);
    },
    
    createClient: async (clientData) => {
        return apiRequest('/clients', {
            method: 'POST',
            body: JSON.stringify(clientData),
        });
    },
    
    updateClient: async (id, clientData) => {
        return apiRequest(`/clients/${id}`, {
            method: 'PUT',
            body: JSON.stringify(clientData),
        });
    },
    
    deleteClient: async (id) => {
        return apiRequest(`/clients/${id}`, {
            method: 'DELETE',
        });
    },
    
    searchClients: async (query, filters = {}) => {
        const params = { q: query, ...filters };
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/clients/search?${queryString}`);
    },
    
    getClientStats: async () => {
        return apiRequest('/clients/stats');
    },
    
    getClientTrainingHistory: async (id) => {
        return apiRequest(`/clients/${id}/training-history`);
    }
};

export default {
    authService,
    foodService,
    trainingService,
    clientService
};
