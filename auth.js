// filepath: auth.js
const { azureAd } = require('./config');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

passport.use(new OIDCStrategy({
    clientID: azureAd.clientId,
    clientSecret: azureAd.clientSecret,
    identityMetadata: `https://login.microsoftonline.com/${azureAd.tenantId}/v2.0/.well-known/openid-configuration`,
    redirectUrl: azureAd.redirectUri,
    responseType: 'code',
    responseMode: 'query',
    scope: ['openid', 'profile', 'email']
}, (iss, sub, profile, accessToken, refreshToken, done) => {
    // ...existing code...
    done(null, profile);
}));

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