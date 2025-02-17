module.exports = {
    // ...existing code...
    azureAd: {
        clientId: process.env.AZURE_AD_CLIENT_ID,
        tenantId: process.env.AZURE_AD_TENANT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        redirectUri: process.env.AZURE_AD_REDIRECT_URI
    }
    // ...existing code...
};
