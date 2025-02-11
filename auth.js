// filepath: auth.js
const msal = require('@azure/msal-node');
const msalConfig = require('./authConfig');

const pca = new msal.ConfidentialClientApplication(msalConfig);

const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: "http://localhost:3000/redirect",
};

const getAuthUrl = async () => {
    try {
        const response = await pca.getAuthCodeUrl(authCodeUrlParameters);
        return response;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

const getToken = async (authCode) => {
    const tokenRequest = {
        code: authCode,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    try {
        const response = await pca.acquireTokenByCode(tokenRequest);
        return response.accessToken;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

module.exports = { getAuthUrl, getToken };