'use client';
import { Suspense } from 'react';
import ExperienceClient from '@/components/home/ExperienceClient';

export default function ExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-mtn-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mtn-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white font-semibold">Loading your connected home...</p>
        </div>
      </div>
    }>
      <ExperienceClient />
    </Suspense>
  );
}
