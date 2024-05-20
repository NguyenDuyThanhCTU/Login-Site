'use client';

import { Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStateProvider } from '@context/StateProvider';
import { PiCardsLight } from 'react-icons/pi';
import PostsHandle from './Posts/PostsHandle';

import { PolicyBox, PostListBox } from './Posts/Display';
import { CategoryProps, PostProps } from '@assets/props';
import CRUDButton from '../items/UI/CRUDButton';
import FileSaver from '../items/Handle/FileSaver';
import Search from '../items/UI/Search';
import SortTable from '../items/UI/SortTable';
import { getHighestNumber } from '../items/Handle/Handle';

interface PostsProps {
  Category: CategoryProps[];
  PostsData: PostProps[];
}

const Posts = ({ Category, PostsData }: PostsProps) => {
  const [isAddModel, setIsAddModel] = useState<boolean>(false);
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [DataFilter, setDataFilter] = useState<PostProps[]>([]);
  const [Data, setData] = useState<PostProps[]>([]);
  const [Policy, setPolicy] = useState<PostProps[]>([]);
  const [currentPagination, setCurrentPagination] = useState<number>(1);
  const [DataShow, setDataShow] = useState<PostProps[]>([]);

  const { setFormData, FormData } = useStateProvider();

  useEffect(() => {
    const policy = PostsData?.filter(
      (item) => item.level0 === 'dieu-khoan-su-dung'
    );
    const other = PostsData?.filter(
      (item) => item.level0 !== 'dieu-khoan-su-dung'
    );
    setPolicy(policy);
    setData(other);
  }, [PostsData]);
  const HandleOpenForm = (id: string, type: string) => {
    if (type === 'add') {
      setIsAddModel(true);
      setFormData({
        stt:
          Data?.length === 0 || Data?.length === undefined
            ? 0
            : Data[0]?.stt + 1,
      });
    } else if (type === 'update') {
      const sort = Data?.find((item) => item.id === id);
      setFormData(sort);
      setIsUpdateModel(true);
    } else if (type === 'dieu-khoan-su-dung') {
      const sort = Policy?.find((item) => item.id === id);
      setFormData(sort);
      setIsUpdateModel(true);
    }
  };

  useEffect(() => {
    if (currentPagination === 1) {
      setDataShow(Data?.slice(0, 10));
    } else {
      setDataShow(
        Data?.slice((currentPagination - 1) * 10, currentPagination * 10)
      );
    }
  }, [currentPagination, DataFilter, Data]);

  useEffect(() => {
    if (DataShow?.length === 0) {
      setDataShow(Data?.slice(0, 10));
    } else {
      setDataShow(DataFilter);
    }
  }, [DataFilter, Data]);

  return (
    <div className="w-full p:px-0 d:px-10 font-light gap-10   bg-white py-10">
      <div className="w-full flex justify-between pr-5">
        <div className="flex items-center gap-5 d:flex-row p:flex-col">
          <div>
            <h3 className="text-[30px] font-bold">Danh sách bài viết</h3>
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <PiCardsLight />
                <p>
                  <strong>{Data?.length}</strong> Bài viết
                </p>
              </div>
            </div>
          </div>
          <div>
            <CRUDButton
              Clicked={() => {
                HandleOpenForm('', 'add');
              }}
              Label="Thêm"
              value="bài viết"
              Style="hover:bg-orange-900 bg-orange-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileSaver Data={Data} />
          <Search Data={Data} Select={HandleOpenForm} Field="title" />
          <SortTable Data={DataShow} setData={setDataFilter} Field="title" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 font-LexendDeca font-light">
        <PolicyBox Policy={Policy} setIsOpen={HandleOpenForm} />
        <div className="grid p:grid-cols-1 d:grid-cols-5 mt-10 gap-5 col-span-3">
          <div className="bg-gray-50 border rounded-lg col-span-5 ">
            <PostListBox
              Category={Category}
              Data={Data}
              DataShow={DataShow}
              setIsOpen={HandleOpenForm}
            />
            {Data?.length > 10 && (
              <div className="w-full justify-end flex py-6 mr-2">
                <Pagination
                  defaultCurrent={currentPagination}
                  total={Data?.length}
                  onChange={(e) => setCurrentPagination(e)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm bài viết"
        open={isAddModel}
        width={1000}
        onCancel={() => setIsAddModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <PostsHandle
          setIsOpen={setIsAddModel}
          Category={Category}
          postsLength={
            PostsData === undefined ? 0 : getHighestNumber(PostsData) + 1
          }
        />
      </Modal>

      <Modal
        title="Chỉnh sửa"
        footer={null}
        open={isUpdateModel}
        width={1000}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsUpdateModel(false)}
      >
        <PostsHandle
          setIsOpen={setIsUpdateModel}
          Category={Category}
          Type="update"
          postsLength={FormData?.stt}
        />
      </Modal>
    </div>
  );
};

export default Posts;
