import { app } from '../infrastructure/core/initializeFirebase';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { useEffect, useState } from 'react';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | undefined>();
  useEffect(() => {
    setAnalytics(getAnalytics(app));
  }, []);
  return analytics;
};
