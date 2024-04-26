'use client';
import { AccountProps } from '@assets/props';
import { find } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [name, setName] = useState<any>();
  const [isRefetch, setIsRefetch] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState<AccountProps>();
  const { verify } = useAuth();
  const { FormData } = useStateProvider();
  const currentUser: any = localStorage.getItem('currentUser');
  const haha = JSON.parse(currentUser);
  useEffect(() => {}, [isRefetch]);
  return (
    <div>
      {haha.password}
      <div>{name && <>{name[0].name}</>}</div>

      <div onClick={() => setIsRefetch(true)}>Click me</div>
    </div>
  );
};

export default Dashboard;
