'use client';
import React, { useState } from 'react';
import Input from './Items/Input';
import Image from 'next/image';
import vnflag from '../../assets/login/vn.png';
import usflag from '../../assets/login/us.png';
import Link from 'next/link';
import { BiHide, BiShow } from 'react-icons/bi';
import { Modal } from 'antd';
import Recover from './Recover';
const Login = () => {
  const [Hide, setHide] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [Username, setUsername] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  return (
    <div className="bg-white ">
      <div className="p-10">
        <div className="text-center font-semibold flex flex-col gap-2">
          <h1 className=" text-[25px]">ADS - Đăng nhập</h1>
          <p className="font-light">
            Xin chào, vui lòng nhập thông tin đăng nhập{' '}
          </p>
          <h2 className="text-[27px] ">ADS</h2>
        </div>
        <div className="flex flex-col gap-3 mt-4  ">
          <div className="w-full mt-3  font-semibold text-[13px] ">
            <div className="mb-2">
              Tài khoản
              <p className="text-red-700 inline-block ml-1">*</p>
            </div>
            <div className="w-full border rounded-lg mb-1">
              <input
                type="text"
                className="p-2 w-full font-normal rounded-lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full   font-semibold text-[13px] ">
            <div className="mb-2">
              Mật khẩu
              <p className="text-red-700 inline-block ml-1">*</p>
            </div>
            <div className="w-full border rounded-lg mb-1 relative">
              <input
                type={Hide ? 'text' : 'password'}
                className="p-2  w-full font-normal rounded-lg "
                onChange={(e) => setPassword(e.target.value)}
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
          Quên mật khẩu
        </p>
        <div className="py-3 bg-blue-600 text-white hover:bg-blue-700 text-center cursor-pointer rounded-md my-5">
          Đăng nhập
        </div>
        <div className="flex items-center justify-center  cursor-pointer">
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
        </div>
        <div className="text-center text-[13px] font-normal text-slate-600 mt-5">
          Bằng việc nhấn nút tiếp tục, bạn đã đồng ý với <br />
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600"
          >
            Điều khoản sử dụng
          </Link>{' '}
          và{' '}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-600"
          >
            {' '}
            Chính sách bảo mật
          </Link>{' '}
          Công Ty ADS
        </div>
      </div>

      <Modal
        title="ADS - Accounts"
        open={isOpenModal}
        footer={false}
        onCancel={() => setIsOpenModal(false)}
      >
        <Recover />
      </Modal>
    </div>
  );
};

export default Login;
