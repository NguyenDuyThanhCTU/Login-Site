'use client';

import { Modal } from 'antd';
import React, { useState } from 'react';

import { useStateProvider } from '@context/StateProvider';
import { CategoryProps } from '@assets/props';
import CRUDButton from '@components/dashboard/items/UI/CRUDButton';
import PostsCategoryBox from './Display';
import PostsCategoryForm from './Create';
import { getHighestNumber } from '@components/dashboard/items/Handle/Handle';
import Heading from '@components/dashboard/items/UI/Heading';

const Category = ({ Data }: { Data: CategoryProps[] }) => {
  const [isAddModel, setIsAddModel] = useState<boolean>(false);
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const { setFormData, FormData } = useStateProvider();

  const HandleOpenForm = (id: string) => {
    setIsUpdateModel(true);
    const sort = Data?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
  };

  return (
    <>
      <Heading
        description="  Tại đây, bạn có thể phân mục, thêm, chỉnh sửa hoặc các đối tượng trong
        danh mục bài viết của mình"
        title="Danh mục loại bài viết"
      />
      <div className="flex mt-5">
        <CRUDButton
          Clicked={setIsAddModel}
          Label="Thêm"
          value="loại bài viết"
          Style="hover:bg-orange-900 bg-orange-700"
        />
      </div>
      <div className="font-LexendDeca font-light">
        <div className="mt-5 text-black">
          <PostsCategoryBox Data={Data} setIsOpen={HandleOpenForm} />
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm danh mục sản phẩm"
        open={isAddModel}
        width={1000}
        onCancel={() => setIsAddModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <PostsCategoryForm
          setIsOpen={setIsAddModel}
          categoryLength={Data === undefined ? 0 : getHighestNumber(Data) + 1}
        />
      </Modal>

      <Modal
        title="Chỉnh sửa"
        footer={null}
        open={isUpdateModel}
        width={700}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsUpdateModel(false)}
      >
        <PostsCategoryForm
          setIsOpen={setIsUpdateModel}
          Type="update"
          categoryLength={FormData?.stt}
        />
      </Modal>
    </>
  );
};

export default Category;
