import React, { useState } from 'react';
import msalInstance from './msalConfig';
// ...existing code...

function App() {
    const [user, setUser] = useState(null);
    // ...existing code...

    const handleLogin = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup({
                scopes: ["user.read"]
            });
            setUser(loginResponse.account);
            console.log('Login successful:', loginResponse);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="App">
            {/* ...existing code... */}
            <button onClick={handleLogin}>Login with Microsoft</button>
            {user && <div>Welcome, {user.name}</div>}
            {/* ...existing code... */}
        </div>
    );
}

export default App;
