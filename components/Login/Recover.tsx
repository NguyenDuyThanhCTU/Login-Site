'use client';
import React, { useState } from 'react';
import logo from '../../assets/login/logo.ico';
import Image from 'next/image';
import Link from 'next/link';

const Recover = () => {
  const [isEmail, setIsEmail] = useState<string>('');
  return (
    <div className="font-LexendDeca font-light ">
      <div className="flex items-center gap-2 w-full border-b justify-center pb-5 ">
        <div className="w-10 h-10 ">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <p className="text-[25px] text-blue-500">
          N<strong className="text-orange-600">DT</strong>
        </p>
      </div>
      <div className=" flex flex-col gap-3 py-5 ">
        <div className="text-center">
          <h2 className="text-[25px] font-normal">Bạn quên mật khẩu?</h2>
          <p className="text-[17px]">Nhập email của bạn để đặt lại mật khẩu</p>
        </div>
        <div className=" mt-3  font-semibold text-[13px] ">
          <div className="w-full border rounded-lg mb-1">
            <input
              type="text"
              className="p-2 w-full font-normal rounded-lg bg-yellow-100"
              onChange={(e) => setIsEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="py-2 bg-blue-500 hover:bg-blue-700  cursor-pointer text-white text-center font-normal rounded-md duration-300">
          Đặt lại mật khẩu
        </div>
        <div className="py-2  duration-300 cursor-pointer text-blue-500 hover:text-blue-700 text-center font-normal rounded-md">
          Quay lại
        </div>
        <div className="mt-5">
          <div className="text-center text-gray-500 text-[13px]">
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
    </div>
  );
};

export default Recover;
