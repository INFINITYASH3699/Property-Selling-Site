'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropertyForm from '@/components/listings/PropertyForm';
import { AuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CreatePropertyPage() {
  const { isAuthenticated, isAgent, loading } = useContext(AuthContext);
  const router = useRouter();
  
  // Redirect if not authenticated or not an agent/admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAgent)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAgent, loading, router]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isAuthenticated || !isAgent) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PropertyForm />
        </div>
      </div>
    </div>
  );
}