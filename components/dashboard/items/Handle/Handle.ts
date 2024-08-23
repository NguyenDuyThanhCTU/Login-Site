'use client';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getApp } from 'firebase/app';

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { CiMail } from 'react-icons/ci';
import { AccountProps, FirebaseConfigProps } from '@assets/props';
import { useSearchParams } from 'next/navigation';

// export const FirebaseHandle = () => {
//   const searchParams = useSearchParams();
//   const searchValue: any = searchParams.get('key');
//   const strCurrentUser = atob(searchValue);
//   const CurrentUser = JSON.parse(strCurrentUser);

//   const app = initializeApp(CurrentUser.firebaseConfig);
//   const db = initializeFirestore(app, {
//     experimentalForceLongPolling: true,
//   });

//   const auth = getAuth(app);
//   return { auth, db };
// };

export const uploadImage = async (
  fileOrEvent: any,
  locate: any,
  storageBucket: any
) => {
  try {
    let selectImage;
    if (fileOrEvent.target && fileOrEvent.target.files) {
      selectImage = fileOrEvent.target.files[0];
    } else {
      selectImage = fileOrEvent;
    }

    const filetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (filetypes.includes(selectImage.type)) {
      const firebaseApp = getApp();

      const storage = getStorage(firebaseApp, storageBucket);
      let storageRef = ref(storage, `${locate}/${selectImage.name}`);

      const snapshot = await uploadBytes(storageRef, selectImage);

      const url = await getDownloadURL(snapshot.ref);

      return url;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const convertListIdToProduct = (
  listId: string[],
  listProduct: any[]
) => {
  let result: any[] = [];
  listId?.forEach((id) => {
    const product = listProduct.find((product) => product.id === id);
    if (product) {
      result.push(product);
    }
  });
  return result;
};

export const convertDate = (date: Date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const;
  return date?.toLocaleDateString('vi-VN', options);
};

export const convertToChartArray = (items: any) => {
  return items.map((item: any) => item.label);
};

export const extractSrc = (embedCode: string) => {
  if (!embedCode) {
    return null;
  }

  // Tìm index của 'src="' trong đoạn mã nhúng
  const srcIndex = embedCode.indexOf('src="');
  if (srcIndex === -1) {
    return null;
  }

  // Tìm index của kết thúc của URL src
  const srcStart = srcIndex + 5; // Bắt đầu sau 'src="'
  const srcEnd = embedCode.indexOf('"', srcStart);

  // Trích xuất URL src từ đoạn mã nhúng
  const srcUrl = embedCode.substring(srcStart, srcEnd);
  return srcUrl;
};

export function getHighestNumber(dataArray: Array<any>) {
  if (dataArray.length === 0) {
    return null; // If the array is empty, return null
  }

  dataArray.sort((a, b) => b.stt - a.stt);

  // The first element in the sorted array will have the largest sequenceNumber
  return dataArray[0].stt;
}

// ramdom number and text 20 character function
export const randomString = () => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 20; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export function formDataToData(formData: any, fields: Array<any>) {
  const result: any = {};
  fields.forEach((field) => {
    if (formData.hasOwnProperty(field)) {
      result[field] = formData[field];
    }
  });
  return result;
}
