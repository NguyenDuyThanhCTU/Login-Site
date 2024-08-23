'use client';
import { InformationProps } from '@assets/props';
import { updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const HandleTag = ({ Data }: { Data: InformationProps }) => {
  const [Tag, setTag] = useState<string>('');
  const { currentUser } = useAuth();
  const router = useRouter();

  const HandleChangeTag = async (item: string) => {
    let newTag = Data?.tag?.filter((i: any) => i !== item);
    await updateOne(currentUser.firebaseConfig, 'Config', 'information', {
      tag: newTag,
      id: 'information',
    }).then(() => {
      router.refresh();
    });
  };

  const HandleTag = async () => {
    if (Data?.tag) {
      if (Data?.tag.includes(Tag)) {
        notification.error({
          message: `Tag ${Tag} đã tồn tại`,
        });
      } else {
        const TagData = [...Data?.tag, Tag];
        await updateOne(currentUser.firebaseConfig, 'Config', 'information', {
          tag: TagData,
          id: 'information',
        }).then(() => {
          router.refresh();
          setTag('');
        });
      }
    } else {
      await updateOne(currentUser.firebaseConfig, 'Config', 'information', {
        tag: [Tag],
        id: 'information',
      }).then(() => {
        router.refresh();
        setTag('');
      });
    }
  };
  return (
    <div className="border rounded-xl border-black">
      <div className="p-2 flex flex-col">
        <div className="grid grid-cols-7 mt-2 items-center gap-10">
          <div className="w-max">Các thẻ Tag:</div>
          <div className="col-span-6">
            <div className=" pl-2 py-2 flex flex-wrap gap-2">
              {Data?.tag?.length > 0 && (
                <>
                  {Data?.tag?.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="border bg-slate-200 rounded-full relative"
                    >
                      <div className="w-max py-1 px-3">#{item}</div>
                      <div
                        className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                        onClick={() => HandleChangeTag(item)}
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
              <p>Thêm Tag</p>
            </div>
            <div className="px-4 py-1 border flex justify-between items-center   bg-white rounded-lg w-full col-span-6">
              <input
                type="text"
                className=" outline-none w-full"
                value={Tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <div
                className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                onClick={() => HandleTag()}
              >
                <MdUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleTag;
