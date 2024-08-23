'use client';
import CRUDButton from '@components/dashboard/items/UI/CRUDButton';
import { deleteOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { Modal, Popconfirm, Rate } from 'antd';
import localFont from 'next/font/local';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { PiCardsLight } from 'react-icons/pi';
import FeedbackList from './Feedback/FeedbackList';
import Handle from './Feedback/Handle';
import { FeedbackProps } from '@assets/props';

const FeedBack = ({ Data }: { Data: FeedbackProps[] }) => {
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const { FormData, setFormData } = useStateProvider();
  const { currentUser } = useAuth();
  const router = useRouter();

  const HandleOpenForm = (Feedback: FeedbackProps) => {
    setFormData(Feedback);
    setIsUpdateModal(true);
  };
  return (
    <div className="w-full  p:px-0 d:px-10 font-light gap-10 min-h-screen  bg-white py-10">
      <h2 className="text-[22px] font-normal">
        Danh sách các phản hồi của khách hàng
      </h2>
      <div className="grid grid-cols-1 mt-10 gap-5 min-h-screen">
        <div className="bg-gray-50 border rounded-lg col-span-3 ">
          <div className="p-3">
            <div>
              <FeedbackList Data={Data} setIsOpen={HandleOpenForm} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Chỉnh sửa phản hồi"
        footer={null}
        width={1200}
        open={isUpdateModal}
        onCancel={() => setIsUpdateModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle setIsOpen={setIsUpdateModal} postsLength={FormData?.stt} />
      </Modal>
    </div>
  );
};

export default FeedBack;
