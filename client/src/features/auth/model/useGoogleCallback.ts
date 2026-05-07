import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '@/shared/model';
import { exchangeGoogleCode } from '../api/authApi';

type Status = 'loading' | 'error';

export function useGoogleCallback() {
  const [status, setStatus] = useState<Status>('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setStatus('error');
      return;
    }

    exchangeGoogleCode(code)
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        navigate('/', { replace: true });
      })
      .catch(() => setStatus('error'));
  }, []);

  return { status };
}
