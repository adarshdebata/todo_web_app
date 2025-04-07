// src/services/todoService.js

const API_URL = 'http://localhost:8080/api/todos';

// Helper function for auth and error handling
const fetchWithAuth = async (url, options = {}, token) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle 401 Unauthorized
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                throw new Error('Session expired. Please login again.');
            }

            // Handle other errors
            throw new Error(data.message || 'API request failed');
        }

        return data.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Get all todos with optional filters
export const fetchTodos = async (token, filters = {}) => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters.completed !== undefined) {
        queryParams.append('completed', filters.completed);
    }
    if (filters.search) {
        queryParams.append('search', filters.search);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;

    return fetchWithAuth(url, {}, token);
};

// Create a new todo
export const addTodo = async (token, todoData) => {
    return fetchWithAuth(
        API_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        },
        token
    );
};

// Update an existing todo
export const updateTodo = async (token, id, todoData) => {
    return fetchWithAuth(
        `${API_URL}/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        },
        token
    );
};

// Delete a todo
export const deleteTodo = async (token, id) => {
    return fetchWithAuth(
        `${API_URL}/${id}`,
        {
            method: 'DELETE'
        },
        token
    );
};


// Additional utility functions could be added here
// For example, filtering, statistics, etc.