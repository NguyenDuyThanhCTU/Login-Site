import { CategoryProps, InformationProps } from '@assets/props';
import { uploadImage } from '@components/dashboard/items/Handle/Handle';
import HandleKeyword from '@components/dashboard/items/Handle/Keyword';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { ColorPicker, Modal, notification, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import slugify from 'slugify';

interface SubCategoryProps {
  label: string;
  value: string;
}

export const StaticForm = ({ Category }: { Category: CategoryProps[] }) => {
  const [DataFilter, setDataFilter] = useState<SubCategoryProps[]>([]);
  const [DataFilterLV1, setDataFilterLV1] = useState<SubCategoryProps[]>([]);

  const { FormData, setFormData } = useStateProvider();
  useEffect(() => {
    let sortedData: any = Category?.find(
      (item: any) => item.level0 === FormData?.level0
    );
    let LV1Format: any = sortedData?.level1?.map((item: any) => ({
      label: item,

      value: slugify(item ? item : '', {
        lower: true,
        locale: 'vi',
      }),
    }));

    setDataFilter(LV1Format);
    if (sortedData) {
      let SubCategoryFormat: any = sortedData[FormData.level1]?.map(
        (item: any) => ({
          label: item,

          value: slugify(item ? item : '', {
            lower: true,
            locale: 'vi',
          }),
        })
      );
      setDataFilterLV1(SubCategoryFormat);
    }
  }, [FormData.level0, FormData.level1]);

  return (
    <form className="flex flex-col gap-2">
      <InputForm
        Label="Tên sản phẩm"
        Type="Input"
        field="title"
        Tips="Nhập tên sản phẩm, tối đa 100 ký tự"
      />
      <InputForm
        Label="Giá sản phẩm"
        Type="Input"
        field="price"
        Tips="Nhập giá sản phẩm (VD: 1.000.000, 10.000.000, ...) .Tối đa 100 ký tự"
      />
      <InputForm Label="Thẻ Mô tả" Type="TextArea" field="description" />

      <div className="border border-gray-600">
        <div className="p-3 flex flex-col gap-2">
          <InputForm
            Label="Loại sản phẩm"
            Type="Select"
            field="level0"
            Option={Category}
          />
          {DataFilter?.length > 0 && (
            <InputForm
              Label="Mục sản phẩm"
              Type="Select"
              field="level1"
              Option={DataFilter}
            />
          )}
          {DataFilterLV1?.length > 0 && (
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Các mục cấp 1"
              onChange={(e) => setFormData({ ...FormData, level2: e })}
              options={DataFilterLV1}
            />
          )}
        </div>
      </div>
      <div className="flex gap-5 flex-col mt-5">
        <InputForm Label="Mô tả sản phẩm" Type="Editor" field="describe" />
        <InputForm Label="Thông số sản phẩm" Type="Editor" field="detail" />
      </div>

      <InputForm Label="Ảnh đại diện" Type="Upload" field="image" />
    </form>
  );
};

export const DynamicForm = () => {
  const [Color, setColor] = useState('');
  const { FormData, setFormData } = useStateProvider();
  const { currentUser, ConfigData } = useAuth();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<string>('');
  const [discountedAmount, setDiscountedAmount] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);

  const customRequest = async (options: any) => {
    options.onSuccess({});

    try {
      const url = await uploadImage(
        options.file,
        'avatar',
        currentUser.firebaseConfig.storageBucket
      );
      const newUrl = {
        uid: options.file.uid,
        url: url,
      };
      if (FormData?.subimage === undefined) {
        setFormData({ ...FormData, subimage: [newUrl] });
      } else {
        setFormData({ ...FormData, subimage: [...FormData?.subimage, newUrl] });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleRemove = (file: any) => {
    const newImageUrl = FormData?.subimage.filter(
      (item: any) => item.uid !== file.uid
    );
    setFormData({ ...FormData, subimage: newImageUrl });
  };

  const informationData: InformationProps = ConfigData?.find(
    (item: any) => item.id === 'information'
  );
  let TagFormat;
  if (informationData.tag) {
    TagFormat = informationData?.tag?.map((item) => ({
      label: item,
      value: item,
    }));
  }

  const calculateNewPrice = () => {
    if (discount === 0) {
      setDiscount(0);
      setNewPrice('0');
    } else if (discount > 100) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Tỷ lệ giảm giá không được lớn hơn 100%',
      });
    } else if (discount < 0) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Tỷ lệ giảm giá không được nhỏ hơn 0%',
      });
    } else {
      //remove dot and remove space
      const Price = FormData?.price.replace(/\./g, '').replace(/\s/g, '');

      // const discountedAmount = (newPrice * discount) / 100
      const discountedAmount = Price * (discount / 100);
      const calculatedNewPrice = Price - discountedAmount;
      setDiscountedAmount(
        discountedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      );
      setNewPrice(
        calculatedNewPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      );
      setFormData({
        ...FormData,
        discount: discount,
        discountedAmount: discountedAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
        newPrice: calculatedNewPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      });
      setDiscount(discount);
      setIsShow(true);
    }
  };

  const HandleSubmit = () => {
    if (!discount) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Vui lòng nhập Tỷ lệ (%) giảm giá',
      });
    } else if (!newPrice) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Chọn "Xem giá mới" trước khi thêm vào danh sách Sale',
      });
    } else {
      setIsOpenModel(false);
    }
  };

  return (
    <div className="d:min-h-[400px] p:min-h-10 flex flex-col gap-2">
      <div className="grid grid-cols-2">
        <div>
          <div className="flex gap-2 items-center">
            <label>Sản phẩm mới nhất: </label>
            <input
              type="checkbox"
              defaultChecked={FormData?.latest ? FormData?.latest : false}
              onChange={(e) => {
                setFormData({
                  ...FormData,
                  latest: e.target.checked,
                });
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label>Sản phẩm bán chạy nhất: </label>
            <input
              type="checkbox"
              defaultChecked={
                FormData?.bestselling ? FormData?.bestselling : false
              }
              onChange={(e) => {
                setFormData({
                  ...FormData,
                  bestselling: e.target.checked,
                });
              }}
            />
          </div>
        </div>
        <div>
          <p
            className="text-red-500 font-semibold cursor-pointer"
            onClick={() => setIsOpenModel(true)}
          >
            Cập nhật giảm giá
          </p>
          <div className="border rounded-xl shadow-xl mt-2">
            <div className="p-3 flex justify-between px-5 ">
              <div>
                <div>
                  Giá cũ:{' '}
                  <strong className="text-gray-400 line-through">
                    {FormData?.price} <sup>VNĐ</sup>
                  </strong>
                </div>

                <div>
                  Giá mới:{' '}
                  <strong className="text-blue-500">
                    {FormData?.newPrice} <sup>VNĐ</sup>
                  </strong>
                </div>
              </div>

              <div>
                <div className="">
                  Giảm giá:{' '}
                  <strong className="text-red-500">
                    {FormData?.discount} %
                  </strong>
                </div>
                <div>
                  Đã giảm:{' '}
                  <strong className="text-red-500">
                    {FormData?.discountedAmount} <sup>VNĐ</sup>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InputForm Label="Bảo hành (Tháng)" Type="Input" field="guarantee" />
      <div className="flex flex-col gap-2">
        <label>Tag: </label>

        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Thẻ Tag cho bài viết"
          onChange={(e) => setFormData({ ...FormData, tag: e })}
          options={TagFormat}
        />
      </div>
      <div>
        <div className="border rounded-lg bg-slate-100 ">
          <div className="p-3 grid grid-cols-2 gap-5 items-center">
            <div className="border rounded-lg  h-20 border-black overflow-y-auto scrollbar-thin">
              <div className="p-2 flex flex-wrap gap-5">
                {FormData?.color?.length > 0 && (
                  <>
                    {FormData?.color?.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className={` bg-[#${item}] border rounded-full relative`}
                      >
                        <ColorPicker value={`#${item}`} />
                        <div
                          className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                          onClick={() => {
                            const newColor = FormData?.color.filter(
                              (itemColor: any) => itemColor !== item
                            );
                            setFormData({
                              ...FormData,
                              color: newColor,
                            });
                          }}
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Màu sản phẩm</label>
              <div className="px-4 py-1 border border-black border-dashed flex  items-center justify-between   bg-white rounded-lg w-full col-span-6">
                <div>
                  <p>Chọn Màu: </p>
                  <ColorPicker
                    defaultValue="#1677ff"
                    onChangeComplete={(e) => setColor(e.toHex())}
                    showText
                    className="mt-3"
                  />
                </div>
                <div
                  className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                  onClick={() => {
                    if (FormData?.color === undefined) {
                      setFormData({
                        ...FormData,
                        color: [Color],
                      });
                      setColor('');
                    } else {
                      setFormData({
                        ...FormData,
                        color: [...FormData?.color, Color],
                      });
                    }

                    setColor('');
                  }}
                >
                  <MdUpload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Ảnh phụ</label>
        <Upload
          customRequest={customRequest}
          fileList={FormData?.subimage ? FormData?.subimage : []}
          listType="picture-card"
          onRemove={handleRemove}
        >
          <div className="flex flex-col items-center">
            <AiOutlinePlus className="text-[24px]" />
            <div className="mt-2">Upload</div>
          </div>
        </Upload>
      </div>

      <Modal
        title="Cập nhật giá mới"
        footer={null}
        open={isOpenModel}
        destroyOnClose={true}
        onCancel={() => setIsOpenModel(false)}
      >
        <div className="flex flex-col gap-2 font-LexendDeca font-light">
          <div>
            Giá hiện tại{' '}
            <strong className="text-red-500">
              {FormData?.price} <sup>VNĐ</sup>{' '}
            </strong>
          </div>
          <div className="flex items-center gap-5">
            <label>Giảm giá (%):</label>
            <div className="py-2 px-4 border rounded-lg">
              <input
                type="number"
                onChange={(e) => {
                  const discountValue = parseInt(e.target.value);
                  setDiscount(discountValue);
                }}
                className="outline-none"
              />
            </div>
          </div>
          <div className="flex">
            {discount ? (
              <>
                {' '}
                <div
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-800 duration-300 text-white cursor-pointer"
                  onClick={() => calculateNewPrice()}
                >
                  Xem giá mới
                </div>
              </>
            ) : (
              <>
                {' '}
                <div className="px-3 py-2 bg-indigo-400   text-white cursor-not-allowed">
                  Xem giá mới
                </div>
              </>
            )}
          </div>
          {isShow && (
            <div className="border rounded-xl shadow-xl">
              <div className="p-3 flex justify-between px-5 ">
                <div>
                  <div>
                    Giá cũ:{' '}
                    <strong className="text-gray-400 line-through">
                      {FormData?.price} <sup>VNĐ</sup>
                    </strong>
                  </div>

                  <div>
                    Giá mới:{' '}
                    <strong className="text-blue-500">
                      {newPrice} <sup>VNĐ</sup>
                    </strong>
                  </div>
                </div>

                <div>
                  <div className="">
                    Giảm giá:{' '}
                    <strong className="text-red-500">{discount} %</strong>
                  </div>
                  <div>
                    Đã giảm:{' '}
                    <strong className="text-red-500">
                      {discountedAmount} <sup>VNĐ</sup>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex justify-end border-t border-gray-400 mt-2">
            <div
              className="py-2 px-3 bg-red-500 hover:bg-red-700 duration-300 cursor-pointer text-white rounded-lg mt-2"
              onClick={() => HandleSubmit()}
            >
              Cập nhật
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const SEOForm = () => {
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();
  return (
    <form className="font-LexendDeca">
      <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
        <div className=" flex flex-col px-5 py-3 text-[18px] font-normal">
          <h2 className="text-[#1a0dab]  text-[30px] font-semibold">
            {FormData?.title === undefined ? <>N/A</> : FormData?.title}
          </h2>
          <p className="text-[#006621]">
            {/* {currentUser.website}/{FormData?.url} */}
          </p>
          <p className="">
            {FormData?.description === undefined
              ? 'N/A'
              : FormData?.description}
          </p>
        </div>
      </div>

      <div className="flex  flex-col gap-2 mt-5">
        <InputForm
          PlaceHolder={FormData?.title}
          Label="Thẻ tiêu đề trang"
          Type="Input"
          field="title"
        />
        <InputForm Label="Đường dẫn" Type="Input" field="url" />

        <InputForm Label="Thẻ mô tả" Type="Input" field="description" />
      </div>
    </form>
  );
};
