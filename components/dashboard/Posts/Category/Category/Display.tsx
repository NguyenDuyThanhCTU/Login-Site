import { CategoryProps } from '@assets/props';
import { ProductSubCategoryForm } from '@components/dashboard/Product/ProductCategory/Category/Handle';
import { deleteOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { Badge, Modal, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import slugify from 'slugify';
import { PostsSubCategoryForm } from './Create';

interface PostsCategoryBoxProps {
  Data: CategoryProps[];
  setIsOpen: (isOpen: string) => void;
}

const PostsCategoryBox = ({ Data, setIsOpen }: PostsCategoryBoxProps) => {
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [Level1Category, setLevel1Category] = useState<string>('');
  const { setFormData } = useStateProvider();
  const router = useRouter();
  const { currentUser } = useAuth();
  const HandleDelete = async (id: string) => {
    deleteOne(currentUser.firebaseConfig, 'PostCategory', id).then(() => {
      router.refresh();
    });
  };

  const HandleSubCategory = (category: string, root: CategoryProps) => {
    const level1Slug = slugify(category, { lower: true, locale: 'vi' });

    setLevel1Category(level1Slug);
    setIsUpdateModel(true);
    setFormData(root);
  };

  return (
    <>
      <div className="grid grid-cols-4 border-b-2 border-black py-3 font-semibold">
        {['Loại sản phẩm', 'Mục sản phẩm', ''].map((item, idx) => (
          <div
            key={idx}
            className={` ${
              item === 'Mục sản phẩm'
                ? 'col-span-2 text-center'
                : 'col-span-1 text-end'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[500px] overflow-y-auto scrollbar-thin ">
        {Data?.map((item, idx) => {
          return (
            <div
              className="grid cursor-default  grid-cols-4 border-b py-3  hover:bg-slate-200 items-center "
              key={idx}
            >
              <div className=" grid grid-cols-3 px-3">
                <p className="text-gray-600"> {idx + 1}</p>
                <p className="col-span-2"> {item.level0}</p>
              </div>

              <div className=" pl-2 py-2 flex flex-wrap gap-2 col-span-2">
                {item?.level1?.map((Lv1item, idx) => {
                  const Level1Slug = slugify(Lv1item, {
                    lower: true,
                    locale: 'vi',
                  });
                  const SubCategoryLength = item[Level1Slug]?.length;
                  return (
                    <div
                      key={idx}
                      className="border bg-slate-200 rounded-full cursor-pointer hover:bg-slate-400 duration-300"
                      onClick={() => HandleSubCategory(Lv1item, item)}
                    >
                      <Badge count={SubCategoryLength}>
                        <div className="w-max py-1 px-3">{Lv1item}</div>
                      </Badge>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex gap-2 items-center justify-end mr-2 ">
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
                  {/* <IndexChanged
                  currentData={item}
                  Data={DataShow}
                  CollectionName="ProductCategory"
                /> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        title={`Chỉnh sửa mục sản phẩm ${Level1Category}`}
        footer={null}
        open={isUpdateModel}
        width={700}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsUpdateModel(false)}
      >
        <PostsSubCategoryForm
          Lv1Field={Level1Category}
          setIsOpen={setIsUpdateModel}
        />
      </Modal>
    </>
  );
};

export default PostsCategoryBox;
