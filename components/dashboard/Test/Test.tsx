'use client';
import { useStateProvider } from '@context/StateProvider';
import React, { useState } from 'react';
import InputForm from '../items/UI/InputForm';

const Test = () => {
  const { FormData } = useStateProvider();
  return (
    <div>
      <InputForm Label="abc" Type="Editor" field={'lala'} />
      <div
        className="ck-content"
        dangerouslySetInnerHTML={
          FormData.lala ? { __html: FormData.lala } : { __html: '....' }
        }
      ></div>
      <p>{FormData?.lala}</p>
    </div>
  );
};

export default Test;
