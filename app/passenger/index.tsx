import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

// Redirects to the app-level login screen so the auth flow is shown first.
export default function PassengerIndex() {
  const router = useRouter();

  useEffect(() => {
    // Replace history so back doesn't return here.
    router.replace('/login' as any);
  }, [router]);

  return null;
}
