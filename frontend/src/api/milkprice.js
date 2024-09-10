// src/api/milkPrice.js

import apiClient from './apiClient';

// Get all milk prices
export const getAllMilkPrices = async () => {
    try {
        const response = await apiClient.get('/milkPrices');
        return response.data;
    } catch (error) {
        console.error("Error fetching milk prices:", error);
        throw error;
    }
};

// Get milk price by ID
export const getMilkPriceById = async (id) => {
    try {
        const response = await apiClient.get(`/milkprice/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching milk price with ID ${id}:`, error);
        throw error;
    }
};

export const getMilkPriceByFat = async (fat, milk_type) => {
    try {
        const response = await apiClient.get(`/milkprice/fat/${fat}`, { params: { milk_type } });
        return response.data;
    } catch (error) {
        console.error(`Error fetching milk price with fat ${fat}:`, error);
        throw error;
    }
};

// Create a new milk price
export const createMilkPrice = async (milkPriceData) => {
    try {
        const response = await apiClient.post('/milkprice/create', milkPriceData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating milk price:", error);
        throw error;
    }
};

// Update a milk price
export const updateMilkPrice = async (id, milkPriceData) => {
    try {
        const response = await apiClient.put(`/milkprice/${id}`, milkPriceData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating milk price with ID ${id}:`, error);
        throw error;
    }
};

// Delete a milk price
export const deleteMilkPrice = async (id) => {
    try {
        const response = await apiClient.delete(`/milkprice/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting milk price with ID ${id}:`, error);
        throw error;
    }
};
