'use client';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const InformationForm = ({ Type }: { Type: string }) => {
  const { FormData, setFormData } = useStateProvider();
  const [SelectedAvatar, setSelectedAvatar] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F1.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb'
  );
  const AvatarItems = [
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F1.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F2.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F3.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F4.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F5.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F7.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
  ];
  const RoleItems = [
    {
      value: 'Standard',
      label: 'Gói cơ bản',
    },
    {
      value: 'Pro',
      label: 'Gói nâng cao',
    },
    {
      value: 'Advance',
      label: 'Gói cao cấp',
    },
    {
      value: 'Admin',
      label: 'Quản trị viên',
    },
  ];

  const StatusItems = [
    {
      value: 'active',
      label: 'Hoạt động',
    },
    {
      value: 'block',
      label: 'Khóa',
    },
  ];

  return (
    <div className="flex flex-col gap-2 justify-center items-center font-LexendDeca font-normal">
      <div>
        <Image
          src={FormData.image ? FormData.image : SelectedAvatar}
          alt="avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h2 className="text-[22px]">
        Thêm thành viên mới cho website của bạn!!!
      </h2>
      <div className="border w-full">
        <div className="m-4 flex flex-col gap-3">
          <div className="">
            <label>Ảnh đại diện</label>
            <div className="flex flex-wrap gap-3  my-3">
              {AvatarItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item === SelectedAvatar
                      ? 'border-red-700 scale-110'
                      : 'border-gray-500'
                  } cursor-pointer border-2 rounded-full  hover:border-red-700 hover:scale-110 duration-100`}
                  onClick={() => setSelectedAvatar(item)}
                >
                  <Image
                    src={
                      item
                        ? item
                        : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full object-center w-[50px] h-[50px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <InputForm Label="Tên thành viên" Type="Input" field="name" />
          <InputForm Label="Tài khoản" Type="Input" field="username" />
          <InputForm Label="Địa chỉ website" Type="Input" field="websiteUrl" />

          <InputForm Label="Mật khẩu" Type="Password" field="password" />
          <InputForm Label="Nhập lại mật khẩu" Type="Password" field="retype" />
          <InputForm
            Label="Vai Trò"
            Type="Select"
            field="role"
            Option={RoleItems}
          />
          {Type === 'update' && (
            <InputForm
              Label="Trạng thái"
              Type="Select"
              field="status"
              Option={StatusItems}
            />
          )}
          <div className="flex gap-2 items-center">
            <label>Đa ngôn ngữ:</label>
            <input
              type="checkbox"
              defaultChecked={
                FormData?.Multilingual ? FormData?.Multilingual : false
              }
              onChange={(e) => {
                setFormData({
                  ...FormData,
                  Multilingual: e.target.checked,
                });
              }}
            />
          </div>
          <div className="border-2 border-red-500 border-dashed">
            <div className="p-3 flex flex-col gap-1">
              <InputForm Label="apiKey" Type="Input" field="apiKey" />
              <InputForm Label="projectId" Type="Input" field="projectId" />
              <InputForm
                Label="messagingSenderId"
                Type="Input"
                field="messagingSenderId"
              />
              <InputForm Label="appId" Type="Input" field="appId" />
              <InputForm
                Label="measurementId"
                Type="Input"
                field="measurementId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeatureForm = () => {
  const { FormData, setFormData } = useStateProvider();
  const FeatureItems = [
    {
      label: 'Trang chủ',
      value: 'home',
    },
    {
      label: 'Cấu hình',
      value: 'cau-hinh',
    },
    {
      label: 'Danh sách sản phẩm',
      value: 'danh-sach-san-pham',
    },
    {
      label: 'Danh mục sản phẩm',
      value: 'danh-muc-san-pham',
    },
    {
      label: 'Danh sách bài viết',
      value: 'danh-sach-bai-viet',
    },
    {
      label: 'Danh mục bài viết',
      value: 'danh-muc-bai-viet',
    },
    {
      label: 'Kênh truyền thông',
      value: 'kenh-truyen-thong',
    },
    {
      label: 'Slide giới thiệu',
      value: 'slide-gioi-thieu',
    },
    {
      label: 'Bộ sưu tập',
      value: 'bo-suu-tap',
    },
    {
      label: 'Đối tác',
      value: 'doi-tac',
    },
    {
      label: 'Chi nhánh',
      value: 'chi-nhanh',
    },
    {
      label: 'Phản hồi của khách hàng',
      value: 'phan-hoi-cua-khach-hang',
    },
    {
      label: 'Thông tin tài khoản',
      value: 'thong-tin-tai-khoan',
    },
    {
      label: 'Đơn hàng',
      value: 'don-hang',
    },
    {
      label: 'Bảo hành',
      value: 'bao-hanh',
    },
    {
      label: 'Quản lý tài khoản',
      value: 'quan-ly-tai-khoan',
    },
  ];
  useEffect(() => {
    if (FormData.feature === undefined) {
      setFormData({
        ...FormData,
        feature: [
          'home',
          'cau-hinh',
          'danh-sach-bai-viet',
          'danh-muc-bai-viet',
          'kenh-truyen-thong',
          'slide-gioi-thieu',
          'thong-tin-tai-khoan',
        ],
      });
    }
  }, []);
  const HandleSelectFeature = (feature: string) => {
    const updatedFeatures = FormData.feature.includes(feature)
      ? FormData.feature.filter((item: string) => item !== feature)
      : [...FormData.feature, feature];

    setFormData({ ...FormData, feature: updatedFeatures });
  };

  return (
    <div className="grid grid-cols-3">
      {FormData.feature && (
        <>
          {' '}
          {FeatureItems.map((item, idx) => (
            <div key={idx}>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={item.value}
                  defaultChecked={FormData?.feature.includes(item.value)}
                  onChange={(e) => {
                    HandleSelectFeature(e.target.value);
                  }}
                />
                <label>{item?.label} </label>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
