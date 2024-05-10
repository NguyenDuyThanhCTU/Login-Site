import React from 'react';
import Category from './Category/Category/Category';
import { CategoryProps, introductoryProps } from '@assets/props';
import PostIntroductory from './Category/Introduction/Introductory';

interface PostsCategoryProps {
  Data: CategoryProps[];
  IntroData: introductoryProps;
}

const PostsCategory = ({ Data, IntroData }: PostsCategoryProps) => {
  return (
    <div className="w-full h-[90vh] grid p:grid-cols-1 d:grid-cols-2 p:px-0 d:px-4 font-light gap-4  ">
      <div className="  bg-white border border-slate-300 rounded-lg">
        <div className="p-4">
          <Category Data={Data} />
        </div>
      </div>
      <div className="  bg-white border border-slate-300 rounded-lg">
        <div className="p-4">
          <PostIntroductory Data={IntroData} />
        </div>
      </div>
    </div>
  );
};

export default PostsCategory;
