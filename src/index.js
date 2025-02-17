import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "161af68c-18c5-4c56-b4bd-52cba27b77b7",
        authority: "https://login.microsoftonline.com/74e5a016-cd97-49e0-94c9-d46227757360",
        redirectUri: "https://search-app-oh2u.vercel.app/",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;