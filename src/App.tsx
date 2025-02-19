import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from '../authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
    const handleLogin = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            console.log('Login successful:', loginResponse);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        msalInstance.logout();
    };

    return (
        <div>
            <h1>Microsoft Login</h1>
            <button onClick={handleLogin}>Login with Microsoft</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default App;
