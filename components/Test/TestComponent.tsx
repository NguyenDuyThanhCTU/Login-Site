'use client';
import TextEditor from '@components/dashboard/items/TextEditor/TextEditor';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { firebaseConfig } from '@config/firebase/Firebase';
import { useStateProvider } from '@context/StateProvider';
import React, { useState } from 'react';

const TestComponent = () => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="grid grid-cols-3">
      <TextEditor
        initialValue="abc..."
        onChange={setValue}
        Form={value}
        Field={'abc'}
        storageBucket={firebaseConfig.storageBucket}
      />
    </div>
  );
};

export default TestComponent;
