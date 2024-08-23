'use client';

import { useStateProvider } from '@context/StateProvider';
import { useState } from 'react';
import { GuaranteeProps, ProductProps } from '@assets/props';
import GuaranteeList from './Guarantee/GuaranteeList';
import CRUDButton from '../items/UI/CRUDButton';
import { Modal } from 'antd';
import Handle from './Guarantee/Handle';
import { getHighestNumber } from '../items/Handle/Handle';

const Guarantee = ({
  Data,
  ProductData,
}: {
  Data: GuaranteeProps[];
  ProductData: ProductProps[];
}) => {
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { FormData, setFormData } = useStateProvider();

  //   const HandleOpenForm = (Guarantee: GuaranteeProps) => {
  //     setFormData(Guarantee);
  //     setIsUpdateModal(true);
  //   };
  return (
    <div className="w-full  p:px-0 d:px-10 font-light gap-10 min-h-screen  bg-white py-10">
      <h2 className="text-[22px] font-normal">Danh sách bảo hành</h2>

      <div className="fixed  top-20 right-0 shadow-green-500 shadow-2xl rounded-r-md group duration-300  bg-white ">
        <div className="p-3">
          <CRUDButton
            Clicked={setOpenModal}
            Label="Thêm"
            value="bảo hành"
            Style="hover:bg-emerald-900 bg-emerald-700 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 mt-10 gap-5 min-h-screen">
        <div className="bg-gray-50 border rounded-lg col-span-3 ">
          <div className="p-3">
            <div>
              <GuaranteeList Data={Data} setIsOpen={setIsUpdateModal} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Thêm bảo hành"
        footer={null}
        width={1200}
        open={isOpenModal}
        onCancel={() => setOpenModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          ProductData={ProductData}
          setIsOpen={setIsUpdateModal}
          guaranteeLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
        />
      </Modal>
      <Modal
        title="Chỉnh sửa bảo hành"
        footer={null}
        open={isUpdateModal}
        onCancel={() => setIsUpdateModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          ProductData={ProductData}
          setIsOpen={setIsUpdateModal}
          guaranteeLength={FormData?.stt}
          Type="update"
        />
      </Modal>
    </div>
  );
};

export default Guarantee;
