'use client';
import { FeedbackProps } from '@assets/props';
import { deleteOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { Popconfirm, Rate } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { PiCardsLight } from 'react-icons/pi';

interface FeedbackListProps {
  Data: FeedbackProps[];
  setIsOpen: (isOpen: any) => void;
}

const FeedbackList = ({ Data, setIsOpen }: FeedbackListProps) => {
  const { HandleNavigate } = useStateProvider();
  const { currentUser } = useAuth();
  const router = useRouter();
  const Navigate = (url: string, type: string) => {
    if (type === 'Bài viết') {
      HandleNavigate(`/bai-viet/${url}`);
    } else if (type === 'Sản phẩm') {
      HandleNavigate(`/chi-tiet-san-pham/${url}`);
    }
  };
  const HandleDelete = async (id: string) => {
    deleteOne(currentUser.firebaseConfig, 'FeedBacks', id).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <>
      <div className="flex justify-between ">
        <div></div>
        <div className="flex items-center gap-4 text-[14px] mr-20">
          <div className="flex items-center gap-1">
            <PiCardsLight />
            <p>{Data?.length} Đánh giá</p>
          </div>
        </div>
      </div>
      <div className="mt-5 text-black d:block p:hidden">
        <div
          className={`grid grid-cols-7 border-b-2 border-black py-3  text-[18px]`}
        >
          {['Dịch Vụ', 'Khách Hàng', 'Xếp Hạng', 'Đánh Giá', 'Thời gian'].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Dịch Vụ' || item === 'Đánh Giá'
                    ? 'col-span-2 ml-10'
                    : 'ml-3 col-span-1'
                } flex  w-full`}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div>
          {Data?.map((item: any, idx: number) => {
            return (
              <div
                className="grid grid-cols-7   border-b py-3 cursor-pointer hover:bg-slate-200 items-center text-[14px]"
                key={idx}
              >
                {item.url ? (
                  <div
                    className="text-start col-span-2 hover:underline hover:text-blue-800 flex items-center gap-3 text-blue-600  font-normal duration-300 ml-5 mr-2"
                    onClick={() => Navigate(item.url, item.type)}
                  >
                    <div className="border rounded-lg bg-gray-100 flex w-max">
                      <div className="p-2 w-14 h-14">
                        <Image
                          src={
                            item.pimage
                              ? item.pimage
                              : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                          }
                          alt="product"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="truncate">{item.pname} </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-start col-span-2 cursor-not-allowed ml-5">
                    N/A
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="p-2 w-14 h-14">
                    <Image
                      src={
                        item.image
                          ? item.image
                          : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/avt.png?alt=media&token=37ccd5c9-f04d-437f-921a-9bee82e98d71'
                      }
                      alt="product"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover object-center rounded-full"
                    />
                  </div>
                  <div>
                    <p className="truncate font-normal">{item.name} </p>
                    {item.phone ? (
                      <div
                        className="text-[13px] font-normal text-red-500 hover:text-red-700 duration-300 hover:underline"
                        onClick={() => HandleNavigate(`tel:${item.phone}`)}
                      >
                        LH: {item.phone}
                      </div>
                    ) : (
                      <p className="text-[13px]"> N/A</p>
                    )}
                  </div>
                </div>
                <div className="">
                  <Rate
                    style={{ fontSize: 12, color: 'orange' }}
                    value={parseFloat(item.star)}
                    disabled
                    allowHalf
                  />
                </div>
                <div className="col-span-2 mr-3">{item.feedback}</div>
                <div className="w-full flex items-center justify-between pr-5">
                  <p>{item.date}</p>
                  <div className="flex items-center text-[30px]">
                    <div
                      className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                      onClick={() => {
                        setIsOpen(item);
                      }}
                    >
                      <FaEdit />
                    </div>
                    <Popconfirm
                      title="Xóa phản hồi"
                      description="Bạn có chắc chắn muốn xóa phản hồi này không?"
                      placement="topLeft"
                      onConfirm={() => HandleDelete(item.id)}
                      okType="danger"
                      okText="Yes"
                      cancelText="No"
                    >
                      <div className=" text-red-500 hover:scale-125 duration-300">
                        <MdDeleteForever />
                      </div>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeedbackList;
