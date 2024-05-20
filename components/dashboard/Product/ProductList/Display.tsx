'use client';

import { CategoryProps, ProductProps } from '@assets/props';
import { deleteOne, updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { Modal, Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaAngleDoubleRight, FaAngleRight, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TbArrowsMoveVertical } from 'react-icons/tb';
import slugify from 'slugify';

interface ListProductProps {
  DataShow: ProductProps[];
  setIsOpen: (isOpen: string) => void;
  CategoryData: CategoryProps[];
}

const ListProductBox = ({
  DataShow,
  setIsOpen,
  CategoryData,
}: ListProductProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isSelected, setSelected] = useState<ProductProps>();
  const [isNewPosition, setNewPosition] = useState<number>();
  const { currentUser } = useAuth();
  const router = useRouter();
  const HandleDelete = async (id: string) => {
    deleteOne(currentUser.firebaseConfig, 'Products', id).then(() => {
      router.refresh();
    });
  };

  const HandleChangePosition = () => {
    const sort = DataShow?.find((item) => item.stt === isNewPosition);
    if (sort) {
      updateOne(
        currentUser.firebaseConfig,
        'Products',
        isSelected ? isSelected.id : '100',
        {
          stt: isNewPosition,
        }
      );
      updateOne(currentUser.firebaseConfig, 'Products', sort.id, {
        stt: isSelected?.stt,
      });
      router.refresh();
      setOpenModal(false);
    } else {
    }
  };

  return (
    <>
      <div className="mt-5 text-black ">
        <div className="grid grid-cols-8 border-b-2 border-black py-3 font-semibold ">
          {['Sản phẩm', 'Đơn giá', 'Danh mục', 'Thời gian', ''].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Sản phẩm'
                    ? 'col-span-2 ml-5 '
                    : item === 'Danh mục'
                    ? 'col-span-3 ml-5 '
                    : 'col-span-1'
                }
                flex  w-full
                `}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div className="block h-[605px] overflow-y-auto scrollbar-thin ">
          {DataShow?.map((item, idx) => {
            const DecodeCategory: any = CategoryData?.find(
              (Citem) =>
                slugify(Citem.level0, {
                  locale: 'vi',
                  lower: true,
                }) === item.level0
            );
            const DecodeLV0 = DecodeCategory?.level0;
            const DecodeLV1 = DecodeCategory?.level1
              ? DecodeCategory?.level1.find(
                  (Citem: any) =>
                    slugify(Citem, {
                      locale: 'vi',
                      lower: true,
                    }) === item.level1
                )
              : '';
            let DecodeLV2;
            if (item.level1) {
              DecodeLV2 = DecodeCategory[item.level1].find(
                (lv2Item: any) =>
                  slugify(lv2Item, { locale: 'vi', lower: true }) ===
                  item.level2
              );
            }

            return (
              <div
                className="grid grid-cols-8 border-b py-3 cursor-pointer hover:bg-slate-100 items-center text-[14px]"
                key={idx}
              >
                <div className="text-start col-span-2  flex items-center gap-3  font-normal duration-300 ml-5 mr-2">
                  <div>{item.stt}</div>
                  <div className="border rounded-lg bg-gray-100 flex w-max">
                    <div className="p-2 w-14 h-14">
                      <Image
                        src={
                          item.image
                            ? item.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt="product"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-blue-700 font-semibold hover:underline hover:text-blue-800 duration-300">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[14px]">
                      <span>Mã SP:</span>
                      <div className="rounded-md px-3 py-1 bg-gray-200">
                        #{item.id}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-red-500">
                  {item.price ? (
                    <p>
                      {item.price} <sup>VNĐ</sup>
                    </p>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>
                <div className="flex flex-col items-start text-[14px] col-span-3">
                  <p className="px-3 py-2 bg-main rounded-full text-white"></p>

                  <div className="flex flex-col">
                    {item.level0 && <p className="">{DecodeLV0}</p>}
                    {item.level0 && (
                      <div className="ml-1 flex items-center gap-1">
                        <FaAngleRight className="text-blue-500" />
                        <p className="">{DecodeLV1}</p>
                      </div>
                    )}
                    {item.level0 && (
                      <div className="ml-2 flex items-center gap-1">
                        <FaAngleDoubleRight className="text-red-600" />
                        <p className="">{DecodeLV2}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">{item.date}</div>{' '}
                <div className="flex items-center  justify-center gap-3 text-[22px] mr-3 cursor-pointer">
                  <div
                    className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                    onClick={() => {
                      setIsOpen(item.id);
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
                    <div className="text-red-500 hover:text-red-700 duration-300 hover:scale-125">
                      <MdDeleteForever />
                    </div>
                  </Popconfirm>
                  <div
                    onClick={() => {
                      setOpenModal(true);
                      setSelected(item);
                    }}
                  >
                    <TbArrowsMoveVertical />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <>
        <Modal
          open={isOpenModal}
          closeIcon={null}
          footer={null}
          width={500}
          centered
          onCancel={() => setOpenModal(false)}
        >
          <div>
            <h2>Stt hiện tại: {isSelected?.stt}</h2>
            <div>
              <div className="px-4 py-1 border  bg-white rounded-lg w-full mt-1 shadow-sm hover:shadow-lg duration-200">
                <input
                  type="number"
                  placeholder="Nhập vị trí mới"
                  className=" outline-none w-full"
                  value={isNewPosition}
                  onChange={(e) => setNewPosition(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div
              className="py-2 text-white  w-full bg-blue-500  hover:bg-blue-700 duration-300 text-center cursor-pointer mt-5"
              onClick={() => HandleChangePosition()}
            >
              Cập nhật
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ListProductBox;
