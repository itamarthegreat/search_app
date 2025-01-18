'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export default function GoogleAuth({ onAuthSuccess }: { onAuthSuccess: (token: string) => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('googleAccessToken');
      if (token) {
        setIsAuthenticated(true);
        onAuthSuccess(token);
      }
    };

    checkAuth();
  }, [onAuthSuccess]);

  const handleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${SCOPES.join(' ')}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const accessToken = new URLSearchParams(hash.slice(1)).get('access_token');
      if (accessToken) {
        localStorage.setItem('googleAccessToken', accessToken);
        setIsAuthenticated(true);
        onAuthSuccess(accessToken);
      }
    }
  }, [onAuthSuccess]);

  if (isAuthenticated) {
    return <p>Authenticated with Google</p>;
  }

  return (
    <Button onClick={handleAuth}>Authenticate with Google</Button>
  );
}

