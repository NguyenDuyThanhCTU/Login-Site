import { CategoryProps } from '@assets/props';
import { deleteOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface ProductCategoryBoxProps {
  DataShow: CategoryProps[];
  setIsOpen: (isOpen: string) => void;
}

const ProductCategoryBox = ({
  DataShow,
  setIsOpen,
}: ProductCategoryBoxProps) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const HandleDelete = async (id: string) => {
    deleteOne(currentUser.firebaseConfig, 'ProductCategory', id).then(() => {
      router.refresh();
    });
  };
  return (
    <>
      <div className="grid grid-cols-4 border-b-2 border-black py-3 font-semibold">
        {['Loại sản phẩm', 'Mục sản phẩm', 'Thời gian'].map((item, idx) => (
          <div
            key={idx}
            className={`flex w-full ${
              item === 'Mục sản phẩm' ? 'col-span-2' : 'col-span-1'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[500px] overflow-y-auto scrollbar-thin ">
        {DataShow?.map((item, idx) => {
          return (
            <div
              className="grid cursor-default  grid-cols-4 border-b py-3  hover:bg-slate-200 items-center "
              key={idx}
            >
              <div className="  ">{item.level0}</div>

              <div className=" pl-2 py-2 flex flex-wrap gap-2 col-span-2">
                {item?.level1?.map((item: any, idx: number) => (
                  <div key={idx} className="border bg-slate-200 rounded-full">
                    <div className="w-max py-1 px-3">{item}</div>
                  </div>
                ))}
              </div>

              <div className="w-full flex gap-2 items-center ">
                <p className="text-[14px]">{item.date}</p>
                <div className="flex items-center gap-3 text-[22px] mr-3 cursor-pointer">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductCategoryBox;
