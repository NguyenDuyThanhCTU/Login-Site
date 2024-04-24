import React from 'react';

interface DashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayout) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
