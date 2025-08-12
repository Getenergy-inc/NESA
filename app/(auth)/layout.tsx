import React from 'react';
import ConditionalLayout from '@/components/Layout/ConditionalLayout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConditionalLayout forcePublic={true}>
      {children}
    </ConditionalLayout>
  );
};

export default Layout;
