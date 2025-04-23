'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PropertyForm from '@/components/listings/PropertyForm';
import { ListingsContext } from '@/context/ListingsContext';
import { AuthContext } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EditPropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getListing, error, loading } = useContext(ListingsContext);
  const { isAuthenticated, isAgent, loading: authLoading } = useContext(AuthContext);
  
  const [property, setProperty] = useState(null);
  
  // Redirect if not authenticated or not an agent/admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAgent)) {
      router.push('/login');
    }
  }, [isAuthenticated, isAgent, authLoading, router]);
  
  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getListing(id);
        setProperty(data);
      } catch (err) {
        console.error('Error fetching property:', err);
      }
    };
    
    if (isAuthenticated && isAgent) {
      fetchProperty();
    }
  }, [id, getListing, isAuthenticated, isAgent]);
  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!isAuthenticated || !isAgent) {
    return null; // Will redirect in the useEffect
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PropertyForm property={property} />
        </div>
      </div>
    </div>
  );
}