'use client';
import { extractSrc } from '@components/dashboard/items/Handle/Handle';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { insertAndCustomizeId, updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface HandleProps {
  setIsOpen: (isOpen: boolean) => void;
  partnerLength: number;
  Type?: string;
}

const Handle = ({ setIsOpen, partnerLength, Type }: HandleProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    if (!FormData.title) {
      notification.error({
        message: 'Đối tác của bạn chưa được thêm',
        description: 'Vui lòng nhập tên đối tác',
      });
    } else {
      if (Type === 'update') {
        updateOne(
          currentUser.firebaseConfig,
          'Partner',
          FormData.id,
          FormData
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      } else {
        const Data = { ...FormData, stt: partnerLength };
        await insertAndCustomizeId(
          currentUser.firebaseConfig,
          'Partner',
          Data,
          `${partnerLength ? 100000000000 + partnerLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };
  return (
    <>
      <div className="   border border-gray-300 rounded-md ">
        <div className="p-4 flex flex-col gap-3 h-[400px] overflow-y-auto scrollbar-thin">
          <InputForm Label="Tên đối tác" Type="Input" field="title" />
          <InputForm Label="Đường dẫn" Type="TextArea" field="url" />
          <InputForm Label="Logo" Type="Upload" field="image" />
        </div>
      </div>
      <div className="flex w-full justify-center py-4 gap-4 font-normal text-[16px] ">
        <div
          className="border border-blue-500 text-blue-500 py-2 w-full cursor-pointer rounded-sm text-center hover:text-white hover:bg-blue-500 "
          onClick={() => HandleSubmit()}
        >
          Trở về
        </div>
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2  w-full cursor-pointer  rounded-sm text-center "
          onClick={() => HandleSubmit()}
        >
          Tiếp tục
        </div>
      </div>
    </>
  );
};

export default Handle;
