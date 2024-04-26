'use client';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { BiHide, BiShow } from 'react-icons/bi';
import { Modal, notification } from 'antd';
import Recover from './Recover';
import SwitchLanguage from '@components/Items/SwitchLanguage';
import { AccountProps } from '@assets/props';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
interface LoginProps {
  Lang: string;
  dict: any;
  Data: AccountProps[];
}

interface isLoginFormProps {
  username: string;
  password: string;
}
const Login = ({ Lang, dict, Data }: LoginProps) => {
  const [Hide, setHide] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isFirebaseConfig, setFirebaseConfig] = useState<AccountProps[]>([]);
  const [isLoginForm, setIsLoginForm] = useState<isLoginFormProps>({
    username: '',
    password: '',
  });
  const { setVerify, setCurrentUser } = useAuth();
  const { HandleNavigate, setIsLoading, setFormData } = useStateProvider();
  useEffect(() => {
    Data.map((item: AccountProps) => {
      setFirebaseConfig([
        ...isFirebaseConfig,
        {
          stt: item.stt,
          id: item.id,
          name: item.name,
          username: item.username,
          password: item.password,
          role: item.role,
          date: item.date,
          firebaseConfig: {
            apiKey: item.apiKey,
            appId: item.appId,
            authDomain: `${item.projectId}.firebaseapp.com`,
            storageBucket: `${item.projectId}.appspot.com`,
            measurementId: item.measurementId,
            messagingSenderId: item.messagingSenderId,
            projectId: item.projectId,
          },
          apiKey: item.apiKey,
          projectId: item.projectId,
          messagingSenderId: item.measurementId,
          appId: item.appId,
          measurementId: item.measurementId,
        },
      ]);
    });
  }, []);

  const HandleLogin = () => {
    if (isLoginForm.password === '' || isLoginForm.username === '') {
      notification.error({
        message: 'Lỗi thiếu thông tin',
        description: 'Vui lòng nhập thông tin Tài khoản và Mật khẩu.',
      });
    } else {
      const checkedAccount = isFirebaseConfig.find(
        (item) =>
          item.username === isLoginForm.username &&
          item.password === isLoginForm.password
      );
      setIsLoading(1500);
      if (checkedAccount) {
        localStorage.setItem('currentUser', JSON.stringify(checkedAccount));
        setCurrentUser(checkedAccount);
        setVerify(true);

        HandleNavigate('/admin');
        notification.success({
          message: 'Đăng nhập thành công',
          description: 'Vui lòng nhập thông tin Tài khoản và Mật khẩu.',
        });
      } else {
        notification.error({
          message: 'Lỗi sai thông tin',
          description: 'Thông tin Tài khoản hoặc Mật khẩu không chính xác.',
        });
      }
    }
  };

  return (
    <div className="bg-white min-w-[350px] ">
      <div className="p-10">
        <div className="text-center font-semibold flex flex-col gap-2">
          <h1 className=" text-[25px]">{dict.LoginPage.HeaderTitle}</h1>
          <p className="font-light">{dict.LoginPage.HeaderContent}</p>
          <h2 className="text-[27px] ">ADS</h2>
        </div>
        <div className="flex flex-col gap-3 mt-4  ">
          <div className="w-full mt-3  font-semibold text-[13px] ">
            <div className="mb-2">
              {dict.LoginPage.Account}
              <p className="text-red-700 inline-block ml-1">*</p>
            </div>
            <div className="w-full border rounded-lg mb-1">
              <input
                type="text"
                className="p-2 w-full font-normal rounded-lg"
                onChange={(e) =>
                  setIsLoginForm({ ...isLoginForm, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full   font-semibold text-[13px] ">
            <div className="mb-2">
              {dict.LoginPage.Password}
              <p className="text-red-700 inline-block ml-1">*</p>
            </div>
            <div className="w-full border rounded-lg mb-1 relative">
              <input
                type={Hide ? 'text' : 'password'}
                className="p-2  w-full font-normal rounded-lg "
                onChange={(e) =>
                  setIsLoginForm({ ...isLoginForm, password: e.target.value })
                }
              />
              {Hide ? (
                <BiHide
                  className="absolute right-3 top-[5px] text-[25px] text-colortopdownBlue"
                  onClick={() => setHide(false)}
                />
              ) : (
                <BiShow
                  className="absolute right-3 top-[5px] text-[25px] text-colortopdownBlue"
                  onClick={() => setHide(true)}
                />
              )}
            </div>
          </div>
        </div>
        <p
          className="text-[14px] text-blue-600 hover:underline cursor-pointer"
          onClick={() => setIsOpenModal(true)}
        >
          {dict.LoginPage.Recover}
        </p>
        <div
          className="py-3 bg-blue-600 text-white hover:bg-blue-700 text-center cursor-pointer rounded-md my-5"
          onClick={() => HandleLogin()}
        >
          {dict.LoginPage.Login}
        </div>
        {/* <div className="flex items-center justify-center  cursor-pointer">
          <div className=" hover:bg-slate-200 duration-300">
            <div className="flex items-center gap-2 p-2">
              <Image
                src={vnflag}
                alt="Viet Nam Flag"
                width={100}
                height={50}
                className="w-[22px] h-[18px]"
              />
              <p className="font-normal">Tiếng Việt</p>
            </div>
          </div>
          <div className=" hover:bg-slate-200 duration-300">
            <div className="flex items-center gap-2 p-2">
              <Image
                src={usflag}
                alt="United States Flag"
                width={100}
                height={50}
                className="w-[20px] h-[18px]"
              />
              <p>English</p>
            </div>
          </div>
        </div> */}
        <div className="flex justify-center w-full">
          <SwitchLanguage Lang={Lang} />
        </div>
        <div className="text-center text-[13px] font-normal text-slate-600 mt-5">
          {dict.LoginPage.Policies}
          <br />
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600"
          >
            {dict.LoginPage.Policy}
          </Link>{' '}
          {dict.LoginPage.and}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600"
          >
            {' '}
            {dict.LoginPage.Privacy}
          </Link>{' '}
          {dict.LoginPage.Company}
        </div>
      </div>

      <Modal
        title="ADS - Accounts"
        open={isOpenModal}
        footer={false}
        onCancel={() => setIsOpenModal(false)}
      >
        <Recover dict={dict} />
      </Modal>
    </div>
  );
};

export default Login;
