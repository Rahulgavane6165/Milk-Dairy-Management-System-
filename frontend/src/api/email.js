import apiClient from './apiClient';

export const sendEmail = async (data) => {
    try {
        const response = await apiClient.post('/email/sendemail', { data});
        return response.data;
    } catch (error) {
        throw error;
    }
};