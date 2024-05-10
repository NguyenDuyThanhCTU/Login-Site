import { ParticlesCustom } from '@components/Login/Items/ParticlesCustom';
import Login from '@components/Login/Login';
import { Metadata } from 'next';
import React from 'react';
import logo from '@assets/login/logo.ico';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from './dictionaries';
import { find } from '@config/api/api';
import { firebaseConfig } from '@config/firebase/Firebase';

export const metadata: Metadata = {
  title: 'Đăng nhập Hệ Thống',
};

const LoginPage = async ({
  params,
}: {
  params: { lang: 'vi' | 'cn' | 'en' };
}) => {
  const dict = await getDictionary(params.lang);
  const Accounts = await find(firebaseConfig, 'Accounts', true);
  return (
    <div className="w-screen h-screen relative">
      <ParticlesCustom />
      <div className="bg-none w-full h-full relative z-20 flex justify-center items-center">
        <Login Lang={params.lang} dict={dict} Data={Accounts} />
      </div>
      <div className="absolute top-5 right-20 flex items-center gap-2 text-[14px] text-gray-400">
        <p>Powered by</p>
        <div className="w-5 h-5 flex items-center gap-2">
          <Image src={logo} alt="logo" width={100} height={100} />
          <p>NDT</p>
        </div>
      </div>
      <div className="absolute w-full bottom-3 flex justify-center gap-2 text-[14px] text-gray-400 z-30">
        <div className="text-center text-gray-500 text-[15px]">
          This site is protected by reCAPTCHA and the Google{' '}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            {' '}
            Terms of Service{' '}
          </Link>
          apply.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
