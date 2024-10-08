'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { PiCardsLight } from 'react-icons/pi';
import Handle from './Branch/Handle';
import BranchCard from './Branch/BranchCard';
import CRUDButton from '../items/UI/CRUDButton';
import { getHighestNumber } from '../items/Handle/Handle';
import { BranchProps } from '@assets/props';

const Branch = ({ Data }: { Data: BranchProps[] }) => {
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const { setFormData } = useStateProvider();
  return (
    <div className="h-[90vh] relative">
      <div className="fixed  top-20 -left-[185px] shadow-green-500 shadow-2xl rounded-r-md group duration-300 hover:left-0 bg-white ">
        <div className="flex items-center gap-5 p-3">
          <div>
            <h3 className="text-[30px] font-bold">Chi nhánh</h3>
            <p className="font-light">Danh sách chi nhánh</p>
          </div>
          <div>
            <CRUDButton
              Clicked={setIsOpenAdd}
              Label="Thêm"
              value="Chi nhánh"
              Style="hover:bg-emerald-900 bg-emerald-700 "
            />
          </div>
        </div>
      </div>

      <div className="mx-2 border rounded-md bg-white  ">
        <div className="p-4 grid grid-cols-5 gap-5 h-[80vh] overflow-y-auto scrollbar-thin">
          {Data?.map((item: any, index: number) => (
            <div key={index}>
              <BranchCard Data={item} />
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Thêm chi nhánh"
        footer={null}
        open={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          setIsOpen={setIsOpenAdd}
          branchLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
        />
      </Modal>
    </div>
  );
};

export default Branch;
