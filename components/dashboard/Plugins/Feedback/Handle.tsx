'use client';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { Rate, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface HandleProps {
  setIsOpen: (isOpen: boolean) => void;
  postsLength: number;
}

const Handle = ({ setIsOpen }: HandleProps) => {
  const { FormData, setFormData } = useStateProvider();
  const { currentUser } = useAuth();

  const router = useRouter();

  const HandleFeedBack = () => {
    if (!FormData?.name) {
      notification.error({
        message: 'Chưa nhập tên',
        description: 'Vui lòng nhập tên của bạn',
      });
    } else if (!FormData?.feedback) {
      notification.error({
        message: 'Chưa nhập nhận xét',
        description: 'Hãy cho chúng tôi biết trải nghiệm của bạn !!',
      });
    } else if (!FormData?.star) {
      notification.error({
        message: 'Chưa đánh giá',
        description: 'Đừng quên đưa ra đánh giá của bạn !!',
      });
    } else {
      updateOne(
        currentUser.firebaseConfig,
        'FeedBacks',
        FormData.id,
        FormData
      ).then(() => {
        setIsOpen(false);
        router.refresh();
        notification.success({
          message: 'Đánh giá thành công',
          description: 'Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi',
        });
      });
    }
  };
  return (
    <div className="font-LexendDeca font-light text-[17px]">
      <div className="grid p:grid-cols-1 d:grid-cols-2 p:gap-10 d:gap-5 justify-start">
        <div className="w-full border-r pr-5">
          <div>
            <label>
              Họ Tên <sup className="text-red-500">(*)</sup>:
            </label>
            <div className="border rounded-md border-mainOrange mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...FormData, name: e.target.value })
                }
                value={FormData?.name}
                type="text"
                placeholder="Nhập họ tên của bạn ..."
                className="p-2 w-full outline-none rounded-md"
              />
            </div>
          </div>
          <div className="mt-5">
            <label>Số điện thoại:</label>
            <div className="border rounded-md  mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...FormData, phone: e.target.value })
                }
                type="text"
                placeholder="Nhập họ tên của bạn ..."
                className="p-2 w-full outline-none rounded-md"
              />
            </div>
          </div>
          <div className="mt-5">
            <InputForm Label="Ảnh đại diện" Type="Upload" field="image" />
          </div>
        </div>
        <div className="border-l-5">
          <div className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
            <div className="mt-5">
              <label>
                Nhận xét <sup className="text-red-500">(*)</sup> :
              </label>
              <div className="border rounded-md  mt-2 border-gray-600">
                <textarea
                  onChange={(e) =>
                    setFormData({
                      ...FormData,
                      feedback: e.target.value,
                    })
                  }
                  value={FormData?.feedback}
                  placeholder="Nhận xét của bạn ..."
                  className="p-2 w-full outline-none rounded-md bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-5">
              <label>
                Đánh giá <sup className="text-red-500">(*)</sup> :
              </label>
              <div className="mt-2">
                <Rate
                  allowHalf
                  defaultValue={4.5}
                  onChange={(e) =>
                    setFormData({ ...FormData, star: e.toString() })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer justify-center gap-5 mt-4">
        <div className="py-3 px-7 bg-red-500 text-white duration-300 hover:bg-red-700 rounded-full">
          Để sau
        </div>
        <div
          className="py-3 px-7 bg-blue-500 text-white duration-300 hover:bg-blue-700 rounded-full"
          onClick={() => HandleFeedBack()}
        >
          Đánh giá
        </div>
      </div>
    </div>
  );
};

export default Handle;
