import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GoogleLogin as GoogleLoginLib } from 'react-google-login';

import { IconGoogle } from '@/components/icons';
import { Button, PageLoader } from '@/components/ui';
import { useToast } from '@/contexts';
import useGoogleLogin from '@/hooks/auth/use-google-login';
import { GOOGLE_CLIENT_ID } from '@/utils/constants';

interface GoogleError {
  error: string;
  details: string;
}

const GoogleLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const googleLogin = useGoogleLogin();
  const { setToast } = useToast();
  const { query } = useRouter();
  const ref = query.ref as string;

  const handleOnSuccess = async (response: any): Promise<void> => {
    try {
      setIsLoggingIn(true);
      const tokenId = response.credential;
      await googleLogin(tokenId);
      setIsLoggingIn(false);
      if (ref) {
        Router.push(`/products/${ref}`);
      } else {
        Router.push('/profile');
      }
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    new (window as any).google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleOnSuccess,
    });
    new (window as any).google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // try next provider if OneTap is not displayed or skipped
      }
    });
    (window as any).google.accounts.id.renderButton(
      document.getElementById('googleButton'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }, []);
  return (
    <>
      {isLoggingIn && <PageLoader />}
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div id="googleButton"></div>
      </div>
    </>
  );
};

export default GoogleLogin;
