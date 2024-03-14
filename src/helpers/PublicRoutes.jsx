// components/PublicRouteWrapper.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSessionStorageItem } from './SessionStorage';
import Loader from '@/components/Loader';


const withPublicRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const isAuthenticated = getSessionStorageItem('token');
      const user = JSON.parse(getSessionStorageItem("user"))
      const role = getSessionStorageItem("role")
      const id = getSessionStorageItem("id");
      console.log({user,role})
      if (isAuthenticated) {
        router.push(`/${user?.data?.userName === "admin" ? "natarajan" : user?.data?.userName}/${role}/${role === "Admin" ? "employee-details":`attendance?userid=${id}`}`); // Redirect to dashboard if token exists
      } else {
        setLoading(false); // Finished checking token
      }
    }, [router]);

    return loading ? <Loader message="Loading..." height="100vh" /> : <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withPublicRoute;
