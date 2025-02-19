export const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID", // Replace with your Microsoft app client ID
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your tenant ID
        redirectUri: "http://localhost:3000", // Replace with your redirect URI
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
