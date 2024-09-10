// src/api/sales.js

import apiClient from './apiClient';

// Get all sales data
export const getAllSales = async () => {
    try {
        const response = await apiClient.get('/sales');
        return response.data;
    } catch (error) {
        console.error("Error fetching sales data:", error);
        throw error;
    }
};

// Get sales data by ID
export const getSaleById = async (id) => {
    try {
        const response = await apiClient.get(`/sales/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sale with ID ${id}:`, error);
        throw error;
    }
};
export const getSalesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/sales/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sales for user ID ${userId}:`, error);
        throw error;
    }
};

// Create a new sale
export const createSale = async (saleData) => {
    try {
        const response = await apiClient.post('/sales/create', saleData);
        return response.data;
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error;
    }
};

// Update a sale
export const updateSale = async (id, saleData) => {
    try {
        const response = await apiClient.put(`/sales/${id}`, saleData);
        return response.data;
    } catch (error) {
        console.error(`Error updating sale with ID ${id}:`, error);
        throw error;
    }
};

// Delete a sale
export const deleteSale = async (id) => {
    try {
        const response = await apiClient.delete(`/sales/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting sale with ID ${id}:`, error);
        throw error;
    }
};
