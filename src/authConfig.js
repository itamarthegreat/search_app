import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "your-client-id", // Replace with your client ID
        authority: "https://login.microsoftonline.com/your-tenant-id", // Replace with your tenant ID
        redirectUri: "http://localhost:3000", // Replace with your redirect URI
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
