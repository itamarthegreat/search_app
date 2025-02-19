import React from "react";
import msalInstance from "../authConfig";

const Login = () => {
    const handleLogin = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup({
                scopes: ["user.read"]
            });
            console.log("Login successful:", loginResponse);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Login with Microsoft</button>
        </div>
    );
};

export default Login;
