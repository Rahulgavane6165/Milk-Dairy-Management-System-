/* eslint-disable no-useless-catch */
// src/api/user.js

import apiClient from './apiClient';

// Fetch user details
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get(`/users/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user details
export const updateUserDetails = async (userId, userData) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserDetails = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
