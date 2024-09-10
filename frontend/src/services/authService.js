import axios from 'axios';

const ssoAuthUrl = process.env.REACT_APP_SSO_AUTH_URL;
const clientId = process.env.REACT_APP_SSO_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SSO_REDIRECT_URI;

export const initiateSSO = () => {
    const url = `${ssoAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile email`;
    window.location.href = url;
};

export const handleSSOCallback = async (code) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sso/callback`, { code });
    // Save token and user data in local storage or state management
    return response.data;
};
