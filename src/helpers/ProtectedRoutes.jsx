// components/ProtectedRouteWrapper.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSessionStorageItem } from './SessionStorage';
import Loader from '@/components/Loader';

const withProtectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const isAuthenticated = getSessionStorageItem('token');
      if (!isAuthenticated) {
        router.push('/'); // Redirect to login page if not authenticated
      } else {
        setLoading(false); // Set loading to false once authentication check is done
      }
    }, [router]);

    if (loading) {
      return <Loader message="Loading..." height="100vh" />; // Display loading indicator while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withProtectedRoute;
