'use client';
import { ProductProps } from '@assets/props';
import { extractSrc } from '@components/dashboard/items/Handle/Handle';
import InputForm from '@components/dashboard/items/UI/InputForm';
import Search from '@components/dashboard/items/UI/Search';
import { insertAndCustomizeId, updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface HandleProps {
  setIsOpen: (isOpen: boolean) => void;
  guaranteeLength: number;
  Type?: string;
  ProductData: ProductProps[];
}

const Handle = ({
  setIsOpen,
  guaranteeLength,
  Type,
  ProductData,
}: HandleProps) => {
  const router = useRouter();
  const { FormData, setFormData } = useStateProvider();
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
        const Data = { ...FormData, stt: guaranteeLength };
        await insertAndCustomizeId(
          currentUser.firebaseConfig,
          'Partner',
          Data,
          `${guaranteeLength ? 100000000000 + guaranteeLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };
  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const length = 100;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    if (result !== '') {
      setFormData({ ...FormData, guaranteeCode: result });
    }
  }

  const HandleSelectProduct = (id: string) => {
    const sort = ProductData?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
  };

  const calculateDaysBetween = (dateInput: any) => {
    const today: any = new Date();

    const selectedDate: any = new Date(dateInput);

    const timeDifference = selectedDate - today;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  useEffect(() => {
    const abc = calculateDaysBetween(FormData?.expirationDate);
    console.log(abc);
  }, [FormData?.expirationDate]);

  return (
    <>
      <div className="   border border-gray-300 rounded-md ">
        <div className="p-4 flex flex-col gap-3 h-[400px] overflow-y-auto scrollbar-thin">
          <div>
            <label> Mã bảo hành</label>
            <>
              {FormData?.guaranteeCode ? (
                <div className="w-full mt-2">
                  <div className="border rounded-lg  bg-gray-200">
                    <div className="p-2 h-10">{FormData?.guaranteeCode}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 items-center gap-3 mt-2">
                  <div className="border rounded-lg col-span-3 bg-gray-200">
                    <div className="p-2 h-10"></div>
                  </div>
                  <div
                    className="border rounded-lg bg-red-500 hover:bg-red-700 duration-300 justify-center h-10 flex items-center text-white font-semibold cursor-pointer"
                    onClick={generateRandomString}
                  >
                    Tạo mã
                  </div>
                </div>
              )}
            </>
          </div>
          <InputForm Label="Tên khách hàng" Type="Input" field="name" />
          <InputForm Label="Số điện thoại" Type="Input" field="phonenumber" />

          <div className="border">
            <div className="p-2 grid grid-cols-2">
              <div className="w-full h-full border-r font-semibold">
                <InputForm
                  Label="Ngày hết bảo hành"
                  Type="DatePicker"
                  field="expirationDate"
                />
                {/* <Search
                  Data={ProductData}
                  Select={HandleSelectProduct}
                  Field="title"
                /> */}
              </div>
              <div></div>
            </div>
          </div>
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
