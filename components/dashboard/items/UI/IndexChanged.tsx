'use client';
import { updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { Modal, Popconfirm, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { TbArrowsMoveVertical } from 'react-icons/tb';

interface IndexChangedProps {
  Data: Array<any>;
  CollectionName: string;
  currentData: any;
}

const IndexChanged = ({
  currentData,
  Data,
  CollectionName,
}: IndexChangedProps) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const router = useRouter();
  const { currentUser } = useAuth();

  const HandleChangePosition = (item: any) => {
    updateOne(currentUser.firebaseConfig, CollectionName, currentData.id, {
      // createdAt: item.createdAt,
      id: item.id,
      stt: item.stt,
    });

    updateOne(currentUser.firebaseConfig, CollectionName, item.id, {
      // createdAt: currentData.createdAt,

      id: currentData.id,
      stt: currentData.stt,
    });
    router.refresh();
    setOpenModal(false);
    // const sort = Data?.find((item: any) => item.stt === isNewPosition);

    // if (isNewPosition === currentData.stt) {
    //   notification.error({
    //     message: 'Vị trí chưa được thay đổi',
    //     description:
    //       'Số thứ tự của mục tiêu không được trùng với số thứ tự hiện tại',
    //   });
    // } else if (isNewPosition > 10) {
    //   notification.error({
    //     message: 'Vị trí chưa được thay đổi',
    //     description: 'Số thứ tự của mục tiêu không được lớn hơn 10',
    //   });
    // } else if (!sort) {
    //   notification.error({
    //     message: 'Vị trí chưa được thay đổi',
    //     description: 'Vị trí bạn chọn ',
    //   });
    // } else {

    // }
  };
  return (
    <div>
      <div
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <TbArrowsMoveVertical />
      </div>
      <Modal
        open={isOpenModal}
        closeIcon={null}
        footer={null}
        width={500}
        centered
        onCancel={() => setOpenModal(false)}
      >
        <div className="font-LexendDeca font-light text-[18px] border">
          <div className="p-2">
            <div className="grid grid-cols-5 items-center justify-center text-center py-2 font-normal border-b">
              <p className="col-span-2">Vị trí hiện tại</p>
              <div className="flex justify-center">
                <FaExchangeAlt />
              </div>
              <p className="col-span-2"> Vị trí mới</p>
            </div>
            <div className=" mt-4 ">
              <div className=" grid grid-cols-2 items-center">
                <div className="text-center ">{currentData?.stt}</div>
                <div className="flex flex-col gap-2">
                  {Data?.map((item: any, idx: number) => {
                    const checkCurrentItem = item.stt === currentData.stt;
                    return (
                      <div key={idx}>
                        {!checkCurrentItem && (
                          <Popconfirm
                            title="Thay đổi vị trí"
                            description={`Vị trí hiện tại sẽ được thay đổi thành ${item.stt}`}
                            placement="topLeft"
                            onConfirm={() => HandleChangePosition(item)}
                            okType="danger"
                            okText="Yes"
                            cancelText="No"
                            key={idx}
                          >
                            <div
                              className="bg-white hover:bg-slate-200 border text-center duration-300 cursor-pointer"
                              key={idx}
                            >
                              {item.stt}
                            </div>
                          </Popconfirm>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="px-4 py-1 border  bg-white rounded-lg w-full mt-1 shadow-sm hover:shadow-lg duration-200">
              <input
                type="number"
                placeholder="Nhập vị trí mới"
                className=" outline-none w-full"
                value={isNewPosition}
                onChange={(e) => setNewPosition(e.target.valueAsNumber)}
              />
            </div>
          </div> */}
          {/* <div
            className="py-2 text-white  w-full bg-blue-500  hover:bg-blue-700 duration-300 text-center cursor-pointer mt-5"
            onClick={() => HandleChangePosition()}
          >
            Cập nhật
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default IndexChanged;
