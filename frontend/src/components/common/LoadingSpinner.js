// src/components/common/LoadingSpinner.js
import React from 'react';

export default function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  // Size classes
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };

  // Text size classes
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  // Different spinner types for better loading experience
  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-t-4 border-b-4 border-blue-500 rounded-full animate-spin`}></div>
        <div className={`${sizeClasses[size]} absolute top-0 left-0 border-t-4 border-b-4 border-transparent border-r-4 border-blue-300 rounded-full animate-pulse`}></div>
      </div>

      {text && (
        <p className={`mt-4 ${textSizeClasses[size]} text-gray-600 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}
