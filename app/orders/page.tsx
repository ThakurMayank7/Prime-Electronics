'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Orders() {

    const { user, loading } = useAuth();

    const router = useRouter();
  
    useEffect(() => {
      if (user === null && loading === false) {
        router.push("/login");
      }
    }, [user, router, loading]);
  
    if (loading) {
      return <p>loading...</p>;
    }



  return (
    <div>Orders</div>
  )
}

export default Orders