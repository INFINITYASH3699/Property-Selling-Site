'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterForm from '@/components/auth/RegisterForm';
import { AuthContext } from '@/context/AuthContext';

export default function RegisterPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-8 h-8 text-blue-500"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  <span className="text-blue-500">Varad</span>Properties
                </h1>
              </div>
            </Link>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-6">
              Create your account
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                sign in to your existing account
              </Link>
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}