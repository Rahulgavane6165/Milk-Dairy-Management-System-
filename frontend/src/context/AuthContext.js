import React, { createContext, useContext, useEffect, useState } from 'react';

import {jwtDecode} from 'jwt-decode';

// Adjust the import if necessary

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = getUserFromToken(token);

            if (decodedToken) {
                setIsAuthenticated(true);
                handleTokenExpiration(decodedToken.exp);
            } else {
                logout();
            }
        }
    }, []);

    const getUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            console.log("Decoded token:", decodedToken);
            return decodedToken;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    const handleTokenExpiration = (exp) => {
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in Unix timestamp (seconds)
        const timeUntilExpiration = exp - currentTime;
        if (timeUntilExpiration > 0) {
            setTimeout(() => {
                logout();
            }, timeUntilExpiration * 1000);
        } else {
            logout();
        }
    };

    const loginToken = (token) => {
        localStorage.setItem('authToken', token.token);
        setIsAuthenticated(true);
        const decodedToken = getUserFromToken(token.token);
        console.log("User data:", decodedToken);

        if (decodedToken) {
            handleTokenExpiration(decodedToken.exp);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        window.location.href = '/signin';  // Redirect to login page on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
