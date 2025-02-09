import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: "d3ab175c-5410-409d-a1ef-e12259b63a82",
    authority: `https://login.microsoftonline.com/74e5a016-cd97-49e0-94c9-d46227757360`,
    redirectUri: "https://search-app-oh2u.vercel.app/",
  },
};
