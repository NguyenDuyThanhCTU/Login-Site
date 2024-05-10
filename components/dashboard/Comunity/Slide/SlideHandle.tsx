import { PostProps, ProductProps } from '@assets/props';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { insertAndCustomizeId, updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SlideForm {
  setIsOpen: (isOpen: boolean) => void;
  slideLength: number;
  Type?: string;
  Products: ProductProps[];
  Posts: PostProps[];
}

const SlidesForm = ({
  setIsOpen,
  slideLength,
  Type,
  Products,
  Posts,
}: SlideForm) => {
  const { FormData } = useStateProvider();
  const RadioItem = [
    {
      label: 'Sản phẩm',
      value: 'Sản phẩm',
    },
    {
      label: 'Bài viết',
      value: 'Bài viết',
    },
  ];
  const router = useRouter();
  const { currentUser } = useAuth();
  const HandleSubmit = async () => {
    if (!FormData?.image) {
      notification.error({ message: 'Vui lòng chọn ảnh' });
    } else {
      if (Type === 'update') {
        updateOne(
          currentUser.firebaseConfig,
          'Slides',
          FormData.id,
          FormData
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      } else {
        const Data = { ...FormData, stt: slideLength };
        await insertAndCustomizeId(
          currentUser.firebaseConfig,
          'Slides',
          Data,
          `${slideLength ? 100000000000 + slideLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
        <InputForm
          Label="Chon đối tượng liên kết"
          Type="Radio"
          field="type"
          Option={RadioItem}
        />
        {FormData?.type === 'Bài viết' ? (
          <>
            <InputForm
              Label="Bài viết liên kết"
              Type="Select"
              field="url"
              Option={Posts}
            />
            <InputForm
              Label="Mô tả nhanh"
              Type="Editor"
              field="describe"
              Option={Posts}
            />
          </>
        ) : (
          FormData?.type === 'Sản phẩm' && (
            <>
              <InputForm
                Label="Sản phẩm liên kết"
                Type="Select"
                field="url"
                Option={Products}
              />
              <InputForm
                Label="Thông số sản phẩm"
                Type="Editor"
                field="describe"
                Option={Posts}
              />
            </>
          )
        )}
        <InputForm Label="Slide giới thiệu" Type="Upload" field="image" />
      </div>
      <>
        {' '}
        <div className="flex w-full justify-end mt-5 pt-3 border-t border-black">
          <div
            className="bg-red-500 hover:bg-red-700 duration-300 cursor-pointer text-white p-2 rounded-md"
            onClick={() => HandleSubmit()}
          >
            {Type === 'update' ? 'Cập nhật' : 'Thêm mới'}
          </div>
        </div>
      </>
    </div>
  );
};

export default SlidesForm;
