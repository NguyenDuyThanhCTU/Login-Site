'use client';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { insertAndCustomizeId, updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

interface PostsCategoryFormProps {
  setIsOpen: (isOpen: boolean) => void;
  categoryLength: number;
  Type?: string;
}

export const PostsCategoryForm = ({
  setIsOpen,
  categoryLength,
  Type,
}: PostsCategoryFormProps) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [Level1, setLevel1] = useState<string>('');
  const { FormData, setFormData } = useStateProvider();
  const HandleChangeLevel1 = (item: number) => {
    let newLevel1 = FormData?.level1?.filter((i: any) => i !== item);
    setFormData({ ...FormData, level1: newLevel1 });
  };
  const HandleSubmit = async () => {
    if (FormData?.level0 === undefined) {
      notification.error({
        message: 'Vui lòng chọn loại bài viết',
      });
    } else {
      if (Type === 'update') {
        updateOne(
          currentUser.firebaseConfig,
          'PostCategory',
          FormData.id,
          FormData
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      } else {
        const Data = {
          ...FormData,
          stt: categoryLength,
        };
        insertAndCustomizeId(
          currentUser.firebaseConfig,
          'PostCategory',
          Data,
          `${categoryLength ? 100000000000 + categoryLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };

  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        <InputForm Label="Loại bài viết" Type="Input" field="level0" />
        <div className="flex gap-2 items-center">
          <label>EN:</label>
          <input
            type="checkbox"
            defaultChecked={FormData?.en ? FormData?.en : false}
            onChange={(e) => {
              setFormData({
                ...FormData,
                en: e.target.checked,
              });
            }}
          />
        </div>
        {Type === 'update' && (
          <div className="border rounded-xl border-black">
            <div className="p-2 flex flex-col">
              <div className="grid grid-cols-7 mt-2">
                <div>Danh sách loại bài viết:</div>
                <div className="col-span-6">
                  <div className=" pl-2 py-2 flex flex-wrap gap-2">
                    {FormData?.level1?.length > 0 && (
                      <>
                        {FormData?.level1?.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="border bg-slate-200 rounded-full relative"
                          >
                            <div className="w-max py-1 px-3">{item}</div>
                            <div
                              className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                              onClick={() => HandleChangeLevel1(item)}
                            >
                              <RxCross2 />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="grid grid-cols-8  items-center  w-full justify-between  ">
                  <div className="col-span-2 flex items-center gap-2 ">
                    <p>Thêm loại bài viết</p>
                  </div>
                  <div className="px-4 py-1 border flex justify-between items-center   bg-white rounded-lg w-full col-span-6">
                    <input
                      type="text"
                      className=" outline-none w-full"
                      value={Level1}
                      onChange={(e) => setLevel1(e.target.value)}
                    />
                    <div
                      className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                      onClick={() => {
                        if (FormData.level1 === undefined) {
                          setFormData({ ...FormData, level1: [Level1] });
                          setLevel1('');
                        } else {
                          setFormData({
                            ...FormData,
                            level1: [...FormData?.level1, Level1],
                          });
                          setLevel1('');
                        }
                      }}
                    >
                      <MdUpload />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full justify-end ">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Tải lên
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostsSubCategoryForm = ({
  Lv1Field,
  setIsOpen,
}: {
  Lv1Field: string;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isSubCategory, setIsSubCategory] = useState<string>('');
  const { FormData, setFormData } = useStateProvider();
  const { currentUser } = useAuth();
  const router = useRouter();
  const HandleSubmit = async () => {
    updateOne(
      currentUser.firebaseConfig,
      'PostCategory',
      FormData.id,
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };

  const HandleRemoveItem = (item: number) => {
    let newLevel1 = FormData[Lv1Field].filter((i: any) => i !== item);
    setFormData({ ...FormData, [Lv1Field]: newLevel1 });
  };
  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        <div className="border rounded-xl border-black">
          <div className="p-2 flex flex-col">
            <div className="grid grid-cols-7 mt-2">
              <div>Các loại bài viết:</div>
              <div className="col-span-6">
                <div className=" pl-2 py-2 flex flex-wrap gap-2">
                  {FormData[Lv1Field]?.length > 0 && (
                    <>
                      {FormData[Lv1Field].map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="border bg-slate-200 rounded-full relative"
                        >
                          <div className="w-max py-1 px-3">{item}</div>
                          <div
                            className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                            onClick={() => HandleRemoveItem(item)}
                          >
                            <RxCross2 />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-8  items-center  w-full justify-between  ">
                <div className="col-span-2 flex items-center gap-2 ">
                  <p>Thêm loại bài viết</p>
                </div>
                <div className="px-4 py-1 border flex justify-between items-center   bg-white rounded-lg w-full col-span-6">
                  <input
                    type="text"
                    className=" outline-none w-full"
                    value={isSubCategory}
                    onChange={(e) => setIsSubCategory(e.target.value)}
                  />
                  <div
                    className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                    onClick={() => {
                      if (FormData[Lv1Field] === undefined) {
                        setFormData({
                          ...FormData,
                          [Lv1Field]: [isSubCategory],
                        });
                        setIsSubCategory('');
                      } else {
                        setFormData({
                          ...FormData,
                          [Lv1Field]: [...FormData[Lv1Field], isSubCategory],
                        });
                        setIsSubCategory('');
                      }
                    }}
                  >
                    <MdUpload />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end ">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Tải lên
          </div>
        </div>
      </div>
    </div>
  );
};
