'use client';
import { AccountProps } from '@assets/props';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { insertAndCustomizeId, updateOne } from '@config/api/api';
import { firebaseConfig } from '@config/firebase/Firebase';
import { useStateProvider } from '@context/StateProvider';
import { notification, Tabs } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FeatureForm, InformationForm } from './Tab/Form';

interface AccountFormProps {
  accountLength: number;
  Data: AccountProps[];
  setIsOpen: (isOpen: boolean) => void;
  Type?: string;
}

const AccountForm = ({
  accountLength,
  Data,
  setIsOpen,
  Type,
}: AccountFormProps) => {
  const { FormData, setFormData } = useStateProvider();
  const [SelectedAvatar, setSelectedAvatar] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F1.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb'
  );

  const router = useRouter();
  const HandleSubmit = async () => {
    if (Type === 'update') {
      updateOne(firebaseConfig, 'Accounts', FormData.id, FormData).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    } else {
      const sort = Data?.filter(
        (item: any) => item.username === FormData.username
      );

      if (!FormData.username || !FormData.password || !FormData.role) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Vui lòng bổ sung đầy đủ thông tin!',
        });
      } else if (FormData.password !== FormData.retype) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Mật khẩu không trùng khớp!',
        });
      } else if (sort?.length > 0) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Tài khoản đã tồn tại!',
        });
      } else if (
        !FormData.apiKey ||
        !FormData.projectId ||
        !FormData.messagingSenderId ||
        !FormData.measurementId ||
        !FormData.appId
      ) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Cấu hình Firebase chưa đầy đủ!',
        });
      } else {
        let Data = {
          ...FormData,
          id: `${accountLength ? 100000000000 + accountLength : 100000000000}`,
          stt: accountLength,
          status: 'active',
          image: SelectedAvatar,
          firebaseConfig: {
            apiKey: FormData.apiKey,
            projectId: FormData.projectId,
            measurementId: FormData.messagingSenderId,
            messagingSenderId: FormData.measurementId,
            appId: FormData.appId,
            authDomain: `${FormData.projectId}.firebaseapp.com`,
            storageBucket: `${FormData.projectId}.appspot.com`,
          },
        };
        delete Data.retype;
        await insertAndCustomizeId(
          firebaseConfig,
          'Accounts',
          Data,
          `${accountLength ? 100000000000 + accountLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };
  //tranaita52@gmail.com [CongTyADS]

  return (
    <>
      <Tabs
        tabPosition="top"
        items={[
          {
            key: '1',
            label: 'Thông tin tài khoản',
            children: (
              <>
                <InformationForm Type="update" />
              </>
            ),
          },
          {
            key: '2',
            label: 'Chức năng',
            children: (
              <>
                <FeatureForm />
              </>
            ),
          },
        ]}
      />
      <div className="flex items-center cursor-pointer gap-3 justify-center mt-2">
        <div className="py-2 px-4 border text-black hover:bg-gray-200 duration-300 hover:border-gray-400">
          Thoát
        </div>
        <div
          className="py-2 px-4 bg-red-500 hover:bg-red-700 duration-300 text-white"
          onClick={() => HandleSubmit()}
        >
          {Type === 'update' ? 'Cập nhật' : 'Thêm'}
        </div>
      </div>
    </>
  );
};

export default AccountForm;
