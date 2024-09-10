/* eslint-disable no-useless-catch */
// src/api/auth.js

import apiClient from './apiClient';

// Login request
export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Register request
export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);       
        return response.data;
    } catch (error) {
        console.log("error occured", error)
        throw error;
    }
};

export const requestReset = async (email) => {
    try {
        const response = await apiClient.post('/auth/request-reset', { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Verify reset token
export const verifyToken = async (token) => {
    try {
        const response = await apiClient.get(`/auth/verify-token?token=${token}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await apiClient.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
};