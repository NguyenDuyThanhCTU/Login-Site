'use client';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import { useStateProvider } from '@context/StateProvider';

import CRUDButton from '../items/UI/CRUDButton';
import Handle from './Partner/Handle';
import { getHighestNumber } from '../items/Handle/Handle';
import { PartnerProps } from '@assets/props';
import PartnerCard from './Partner/PartnerCard';

const Partner = ({ Data }: { Data: PartnerProps[] }) => {
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);

  const { setFormData, FormData } = useStateProvider();

  const HandleUpdatePartner = (partnerData: PartnerProps) => {
    setFormData(partnerData);
    setIsOpenUpdate(true);
  };

  return (
    <div className="h-[90vh] relative">
      <div className="fixed  top-20 -left-[185px] shadow-green-500 shadow-2xl rounded-r-md group duration-300 hover:left-0 bg-white ">
        <div className="flex items-center gap-5 p-3">
          <div>
            <h3 className="text-[30px] font-bold">Đối tác</h3>
            <p className="font-light">Danh sách đối tác</p>
          </div>
          <div>
            <CRUDButton
              Clicked={setIsOpenAdd}
              Label="Thêm"
              value="Đối tác"
              Style="hover:bg-emerald-900 bg-emerald-700 "
            />
          </div>
        </div>
      </div>

      <div className="mx-2 border rounded-md bg-white  ">
        <div className="p-4 grid grid-cols-5 gap-5 h-[80vh] overflow-y-auto scrollbar-thin">
          {Data?.map((item: any, index: number) => (
            <div key={index}>
              <PartnerCard Data={item} setIsOpen={HandleUpdatePartner} />
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Thêm đối tác"
        footer={null}
        open={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          setIsOpen={setIsOpenAdd}
          partnerLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
        />
      </Modal>
      <Modal
        title="Chỉnh sửa đối tác"
        footer={null}
        open={isOpenUpdate}
        onCancel={() => setIsOpenUpdate(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          setIsOpen={setIsOpenUpdate}
          partnerLength={FormData?.stt}
          Type="update"
        />
      </Modal>
    </div>
  );
};

export default Partner;
