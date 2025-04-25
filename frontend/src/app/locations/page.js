// app/locations/page.js
"use client";

import React, { Suspense } from "react";
import LocationsPageContent from "@/components/locations/LocationsPageContent";

// Fallback skeleton shown during Suspense
const SuspenseFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center py-20 text-gray-600 dark:text-gray-400">
      Loading Locations...
    </div>
  </div>
);

export default function LocationsPage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <LocationsPageContent />
    </Suspense>
  );
}