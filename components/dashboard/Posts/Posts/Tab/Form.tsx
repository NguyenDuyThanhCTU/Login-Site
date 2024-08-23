'use client';

import { CategoryProps, InformationProps } from '@assets/props';
import { uploadImage } from '@components/dashboard/items/Handle/Handle';
import HandleKeyword from '@components/dashboard/items/Handle/Keyword';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { Select, Upload } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import slugify from 'slugify';
interface lv1CategoryProps {
  label: string;
  value: string;
}
export const StaticForm = ({ Category }: { Category: CategoryProps[] }) => {
  const [DataFilter, setDataFilter] = useState<lv1CategoryProps[]>([]);
  const [DataFilterLV1, setDataFilterLV1] = useState<[]>([]);
  const { FormData, setFormData } = useStateProvider();
  const [isOpenNote, setOpenNote] = useState(false);
  useEffect(() => {
    let sortedData: any = Category?.find(
      (item: any) => item.level0 === FormData?.level0
    );
    let LV1Format: any = sortedData?.level1?.map((item: any) => ({
      label: item,

      value: slugify(item ? item : '', {
        lower: true,
        locale: 'vi',
      }),
    }));

    setDataFilter(LV1Format);
    if (sortedData) {
      let SubCategoryFormat: any = sortedData[FormData.level1]?.map(
        (item: any) => ({
          label: item,

          value: slugify(item ? item : '', {
            lower: true,
            locale: 'vi',
          }),
        })
      );
      setDataFilterLV1(SubCategoryFormat);
    }
  }, [FormData.level0, FormData.level1]);

  return (
    <form className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
      <div className="grid grid-cols-2 gap-5">
        {' '}
        <div className="flex flex-col gap-2">
          <InputForm Label="Tiêu đề bài viết" Type="Input" field="title" />{' '}
          {FormData?.level0 !== 'Điều khoản sử dụng' && (
            <InputForm Label="Ảnh đại diện" Type="Upload" field="image" />
          )}
        </div>
        <div className="flex flex-col  gap-2">
          <InputForm
            Label="Loại bài viết"
            Type="Select"
            field="level0"
            Option={[
              ...Category,
              { level0: 'Điều khoản sử dụng' },
              { level0: 'Policy' },
            ]}
          />{' '}
          {(FormData?.level0 !== 'Điều khoản sử dụng' ||
            FormData?.level0 !== 'Policy') &&
            DataFilter?.length > 0 && (
              <InputForm
                Label="Mục bài viết"
                Type="Select"
                field="level1"
                Option={DataFilter}
              />
            )}
          {DataFilterLV1?.length > 0 && (
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Các mục cấp 1"
              onChange={(e) => setFormData({ ...FormData, level2: e })}
              options={DataFilterLV1}
            />
          )}
          <InputForm
            Label="Thời gian đọc (phút)"
            Type="Input"
            field="readingtime"
          />{' '}
          <InputForm Label="Tác giả" Type="Input" field="author" />{' '}
          <div className="flex gap-2 items-center">
            <label>Post nổi bật: </label>
            <input
              type="checkbox"
              defaultChecked={isOpenNote}
              onChange={(e) => {
                setOpenNote(!isOpenNote);
              }}
            />
          </div>
          {isOpenNote && (
            <div className="grid grid-cols-2 gap-2">
              <InputForm Label="Nội dung 1" Type="Input" field="option1" />
              <InputForm Label="Nội dung 2" Type="Input" field="option2" />
              <InputForm Label="Nội dung 3" Type="Input" field="option3" />
              <InputForm Label="Nội dung 4" Type="Input" field="option4" />
              <InputForm Label="Nội dung 5" Type="Input" field="option5" />{' '}
            </div>
          )}
        </div>
      </div>
      <InputForm Label="Chi Tiết" Type="Editor" field="content" />
      <InputForm Label="Mô tả" Type="TextArea" field="description" />
    </form>
  );
};

export const DynamicForm = () => {
  const { FormData, setFormData } = useStateProvider();
  const { currentUser, ConfigData } = useAuth();
  const informationData: InformationProps = ConfigData?.find(
    (item: any) => item.id === 'information'
  );
  let TagFormat;
  if (informationData.tag) {
    TagFormat = informationData?.tag?.map((item) => ({
      label: item,
      value: item,
    }));
  }
  async function customRequest(options: any) {
    options.onSuccess({});

    try {
      const url = await uploadImage(
        options.file,
        'avatar',
        currentUser.firebaseConfig.storageBucket
      );
      const newUrl = {
        uid: options.file.uid,
        url: url,
      };
      if (FormData?.subimage === undefined) {
        setFormData({ ...FormData, subimage: [newUrl] });
      } else {
        setFormData({ ...FormData, subimage: [...FormData?.subimage, newUrl] });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const handleRemove = (file: any) => {
    const newImageUrl = FormData?.subimage.filter(
      (item: any) => item.uid !== file.uid
    );
    setFormData({ ...FormData, subimage: newImageUrl });
  };
  return (
    <div className="d:min-h-[400px] p:min-h-10 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label>Post nổi bật: </label>
        <input
          type="checkbox"
          defaultChecked={FormData?.isHighlight ? FormData?.isHighlight : false}
          onChange={(e) => {
            setFormData({
              ...FormData,
              isHighlight: e.target.checked,
            });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Tag: </label>

        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Thẻ Tag cho bài viết"
          onChange={(e) => setFormData({ ...FormData, tag: e })}
          options={TagFormat}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Ảnh bài viết</label>
        <Upload
          customRequest={customRequest}
          fileList={FormData?.subimage ? FormData?.subimage : []}
          listType="picture-card"
          onRemove={handleRemove}
        >
          <div className="flex flex-col items-center">
            <AiOutlinePlus className="text-[24px]" />
            <div className="mt-2">Upload</div>
          </div>
        </Upload>
      </div>
    </div>
  );
};

export const SEOForm = () => {
  const { FormData } = useStateProvider();
  const { websiteUrl } = useAuth();
  return (
    <>
      <form className="font-LexendDeca">
        <Link
          target="_blank"
          href={`https://www.google.com/search?q=${websiteUrl}/chi-tiet-bai-viet/${FormData?.url}`}
        >
          <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
            <div className=" flex flex-col px-5 py-3 text-[18px] font-normal">
              <h2 className="text-[#1a0dab]  text-[30px] font-semibold">
                {FormData?.title === undefined ? <>N/A</> : FormData?.title}
              </h2>
              <p className="text-[#006621]">
                {websiteUrl}/{FormData?.url}
              </p>
              <p className="">
                {FormData?.description === undefined
                  ? 'N/A'
                  : FormData?.description}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex  flex-col gap-2 mt-5">
          <InputForm
            PlaceHolder={FormData?.title}
            Label="Thẻ tiêu đề trang"
            Type="Input"
            field="title"
          />
          <InputForm Label="Đường dẫn" Type="Input" field="url" />

          <InputForm Label="Thẻ mô tả" Type="Input" field="description" />
        </div>
      </form>
    </>
  );
};
