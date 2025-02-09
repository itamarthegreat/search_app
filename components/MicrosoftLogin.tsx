'use client';

import { useMsal } from '@azure/msal-react';
import { Button } from '@/components/ui/button';

export default function MicrosoftLogin() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
      scopes: ['User.Read'],
    }).catch(e => {
      console.error(e);
    });
  };

  return (
    <Button onClick={handleLogin}>Login with Microsoft</Button>
  );
}