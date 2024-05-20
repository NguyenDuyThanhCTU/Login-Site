'use client';

import { useAuth } from '@context/AuthProviders';
import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { verify } = useAuth();
  const router = useRouter();

  if (!verify) {
    return router.push('/');
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
