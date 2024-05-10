'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal, Popconfirm } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiMapPin } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { FaCircleUser } from 'react-icons/fa6';
import { GiAlarmClock } from 'react-icons/gi';
import { RiUserSettingsLine } from 'react-icons/ri';
import Handle from './Handle';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { deleteOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { PartnerProps } from '@assets/props';
interface PartnerCardProps {
  Data: PartnerProps;
  setIsOpen: (isOpen: PartnerProps) => void;
}
const PartnerCard = ({ Data, setIsOpen }: PartnerCardProps) => {
  const { setFormData, FormData } = useStateProvider();
  const { currentUser } = useAuth();
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne(currentUser.firebaseConfig, 'Partner', id).then(() => {
      router.refresh();
    });
  };
  return (
    <div className="border border-black rounded-lg shadow-lg">
      <div className="p-2">
        <h2 className="text-center uppercase font-semibold text-[22px] pb-2 border-b truncate border-black">
          {Data?.title}
        </h2>
        <div className="border mt-2 rounded-lg border-gray-400">
          <div className=" m-2 flex justify-center h-[200px] ">
            <Image
              src={Data.image}
              alt="no address found"
              width={150}
              height={150}
              className="w-full h-full object-contain"
            ></Image>
          </div>
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="pt-2 flex justify-between font-normal">
            <div className="">Thông tin đối tác</div>
            <Link
              href={Data.url ? Data.url : ''}
              target="_blank"
              className={`${
                Data.url ? 'text-blue-600 hover:underline' : 'text-gray-400'
              } flex items-center gap-1  text-[15px] cursor-pointer `}
            >
              <BiMapPin />
              <p>Xem ngay</p>
            </Link>
          </div>
        </div>

        <div className="flex w-full gap-2 text-center py-2 border-t border-black cursor-pointer font-normal ">
          <Popconfirm
            title="Xóa phản hồi"
            description="Bạn có chắc chắn muốn xóa phản hồi này không?"
            placement="left"
            onConfirm={() => HandleDelete(Data.id)}
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            <div className="w-full py-3 border-red-500 text-red-500 border hover:bg-red-500 hover:text-white duration-300">
              Xóa
            </div>
          </Popconfirm>

          <div
            className="bg-blue-500 text-white w-full py-3 hover:bg-blue-700 duration-300"
            onClick={() => {
              setIsOpen(Data);
            }}
          >
            Chỉnh Sửa
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
