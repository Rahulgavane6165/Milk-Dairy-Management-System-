// src/api/collection.js

import apiClient from './apiClient';

// Get all collections
export const getAllCollections = async () => {
    try {
        const response = await apiClient.get('/collections');
        return response.data;
    } catch (error) {
        console.error("Error fetching collections:", error);
        throw error;
    }
};

// Get collection by ID
export const getCollectionById = async (id) => {
    try {
        const response = await apiClient.get(`/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collection with ID ${id}:`, error);
        throw error;
    }
};

export const getCollectionsByDate = async (date) => {
    try {
        const response = await apiClient.get(`/collections/date/${date}`);  // Pass the date in the URL
        return response.data;
    } catch (error) {
        console.error(`Error fetching collections for date ${date}:`, error);
        throw error;
    }
};


export const getCollectionsByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/collections/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collections for user ID ${userId}:`, error);
        throw error;
    }
};

// Create a new collection
export const createCollection = async (collectionData) => {
    try {
        const response = await apiClient.post('/collections/create', collectionData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating collection:", error);
        throw error;
    }
};

// Update a collection
export const updateCollection = async (id, collectionData) => {
    try {
        const response = await apiClient.put(`/collections/${id}`, collectionData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating collection with ID ${id}:`, error);
        throw error;
    }
};

// Delete a collection
export const deleteCollection = async (id) => {
    try {
        const response = await apiClient.delete(`/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting collection with ID ${id}:`, error);
        throw error;
    }
};
