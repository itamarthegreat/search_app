import React, { createContext } from 'react';
import { MsalProvider } from '@azure/msal-react';
import msalInstance from '../msalConfig';

// ...existing code...

const MyApp = ({ Component, pageProps }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
};

export default MyApp;
