'use client';
import { useAuth } from '@context/AuthProviders';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayout) => {
  const { verify } = useAuth();
  if (!verify) {
    const router = useRouter();
    return router.push('/');
  }
  return <div>{children}</div>;
};

export default DashboardLayout;
