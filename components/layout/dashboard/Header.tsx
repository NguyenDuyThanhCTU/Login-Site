'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaGoogleDrive, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { IoLogOut, IoSettingsOutline, IoSunnyOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { TbGridDots } from 'react-icons/tb';
import { Drawer, Modal, Switch, Tooltip } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { useStateProvider } from '@context/StateProvider';
import { DashboardMapping, FunctionItem } from './items/items';
import HeaderDropDown from './items/header/HeaderDropDown';
import MobileUI from './items/header/MobileUI';
import { useAuth } from '@context/AuthProviders';

interface ChildrenAdminHeaderProps {
  label: string;
  value: string;
  icon: string;
}

interface AdminPageHeaderItemsProps {
  label: string;
  value: string;
  icon: string;
  children: ChildrenAdminHeaderProps[];
}

const Header = ({ dict, Key }: { dict: any; Key: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchRs, setSearchRs] = useState<AdminPageHeaderItemsProps[]>([]);
  const { currentUser, HandleDashboardNavigate, setVerify } = useAuth();
  const { HandleNavigate, setLanguage } = useStateProvider();
  useEffect(() => {
    const sort = dict.DashboardPage.Header?.filter(
      (product: AdminPageHeaderItemsProps) =>
        product?.label?.toLowerCase().includes(search.toLowerCase())
    );

    setSearchRs(sort);
  }, [search]);

  // const DashboardHeader =
  //   currentUser.role === 'Standard'
  //     ? dict.DashboardPage.StandardHeader
  //     : currentUser.role === 'Pro'
  //     ? dict.DashboardPage.ProHeader
  //     : currentUser.role === 'Advance'
  //     ? dict.DashboardPage.AdvanceHeader
  //     : currentUser.role === 'Admin' && dict.DashboardPage.AdminHeader;

  const Header = [
    {
      label: 'Cấu Hình',
      value: 'cau-hinh',
      icon: 'IoSettingsOutline',
      children: [],
    },
    {
      label: 'Sản Phẩm',
      value: 'danh-sach-san-pham',
      icon: 'GiStarSattelites',
      children: [
        {
          label: 'Danh Sách Sản Phẩm',
          value: 'danh-sach-san-pham',
          icon: 'PiCirclesThreePlusDuotone',
        },
        {
          label: 'Danh Mục Sản Phẩm',
          value: 'danh-muc-san-pham',
          icon: 'CiBoxList',
        },
      ],
    },
    {
      label: 'Bài Viết',
      value: 'danh-sach-bai-viet',
      icon: 'BsPostcard',
      children: [
        {
          label: 'Danh Sách Bài Viết',
          value: 'danh-sach-bai-viet',
          icon: 'IoListSharp',
        },
        {
          label: 'Danh Mục Bài Viết',
          value: 'danh-muc-bai-viet',
          icon: 'CgListTree',
        },
      ],
    },
    {
      label: 'Truyền Thông',
      value: 'kenh-truyen-thong',
      icon: 'IoShareSocialOutline',
      children: [
        {
          label: 'Kênh Truyền Thông',
          value: 'kenh-truyen-thong',
          icon: 'PiShareNetworkLight',
        },
        {
          label: 'Slide giới thiệu',
          value: 'slide-gioi-thieu',
          icon: 'BiSlideshow',
        },
        {
          label: 'Bộ sưu tập',
          value: 'bo-suu-tap',
          icon: 'IoImagesOutline',
        },
      ],
    },
    {
      label: 'Tài Khoản',
      value: 'thong-tin-tai-khoan',
      icon: 'MdManageAccounts',
      children: [
        {
          label: 'Thông Tin Tài Khoản',
          value: 'thong-tin-tai-khoan',
          icon: 'AiOutlineProfile',
        },
        {
          label: 'Quản Lý Tài Khoản',
          value: 'quan-ly-tai-khoan',
          icon: 'BiSolidUserAccount',
        },
      ],
    },
    {
      label: 'Báo Cáo',
      value: 'bao-cao',
      icon: 'TbReport',
      children: [
        {
          label: 'Lượt Truy Cập',
          value: 'luot-truy-cap',
          icon: 'BiLoader',
        },

        {
          label: 'Đơn Hàng',
          value: 'don-hang',
          icon: 'BiCube',
        },
        {
          label: 'Sản Phẩm Xem Nhiều',
          value: 'san-pham-xem-nhieu',
          icon: 'BiHappy',
        },
      ],
    },
    {
      label: 'Tiện Ích',
      value: 'dich-vu',
      icon: 'BiHive',
      children: [
        {
          label: 'Chi Nhánh',
          value: 'chi-nhanh',
          icon: 'GoGitBranch',
        },
        {
          label: 'Đối Tác',
          value: 'doi-tac',
          icon: 'LuGitCompare',
        },
        {
          label: 'Phản Hồi của Khách Hàng',
          value: 'phan-hoi-cua-khach-hang',
          icon: 'BiPencil',
        },
        {
          label: 'Bảo hành',
          value: 'bao-hanh',
          icon: 'BiCheckCircle',
        },
      ],
    },
  ];
  return (
    <div className="">
      <div className="border-b shadow-xl  h-[65px] p:hidden d:grid  grid-cols-4  bg-white ">
        <div
          onClick={() => HandleDashboardNavigate(`/admin?tab=home`)}
          className="w-full "
        >
          <div className="h-[60px] w-full relative cursor-pointer ">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/RUN%20(500%20x%2084%20px).png?alt=media&token=0eab0ed0-9368-4abd-aa83-d1903049a162"
              alt="Admin logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center ">
          {Header.map((item: AdminPageHeaderItemsProps, index: number) => {
            const Icon = DashboardMapping[item.icon];

            return (
              <div className="group relative" key={index}>
                <div
                  onClick={() =>
                    HandleDashboardNavigate(
                      `/admin?tab=${item.value}&key=${Key}`
                    )
                  }
                  className="flex cursor-pointer gap-2 items-center group font-light hover:bg-gray-100 h-max py-2 px-5  rounded-md"
                >
                  <Icon />
                  <p className="w-max text-[14px]">{item.label}</p>
                </div>
                {item?.children.length > 0 && (
                  <div className="hidden group-hover:block absolute top-14 z-50 ">
                    <HeaderDropDown Data={item.children} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-1 text-[24px] text-gray-600 w-full cursor-pointer ">
          {currentUser.Multilingual && (
            <Switch
              checkedChildren="Tiếng Việt"
              unCheckedChildren={<div className="text-black">English</div>}
              defaultChecked
              className="w-36"
              onChange={(e) => setLanguage(e)}
            />
          )}
          <div>
            <Tooltip title="Chế độ ban đêm" placement="left">
              <div className="text-[#D6630A] bg-[#FFE6AD] text-[18px] p-2 rounded-full hover:bg-[#D6630A] hover:text-white duration-300">
                <IoSunnyOutline />
              </div>
            </Tooltip>
          </div>
          <div>
            <div
              className=" p-2 hover:scale-125 duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <IoIosSearch />
            </div>
          </div>
          <div>
            <div className=" p-2  hover:scale-125 duration-300">
              <FaGoogleDrive />
            </div>
          </div>
          <div>
            <div className="group relative">
              <div className=" p-2  hover:scale-125 duration-300">
                <TbGridDots />
              </div>
              <div className="hidden group-hover:block absolute top-14 -left-14">
                <div className=" min-w-[200px] border-gray-300  border border-solid rounded-lg bg-white relative  ">
                  <div className="grid grid-cols-3 p-1">
                    {FunctionItem?.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-100"
                        onClick={() => HandleDashboardNavigate(item.value)}
                      >
                        <Image
                          src={item.image}
                          alt="function"
                          width={200}
                          height={200}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute w-4 h-4 border border-b-0 border-r-0 bg-white border-solid border-gray-300 -top-2 right-[50%] transform rotate-45 z-0"></div>
                  <div className="w-full h-10  bg-none absolute -top-5 "> </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="group relative">
              <div className="relative w-10 h-10 ">
                <Image
                  width={100}
                  height={100}
                  src={
                    currentUser?.image
                      ? currentUser?.image
                      : 'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/partner.png?alt=media&token=4e0f99cb-23c4-462d-a9ab-320575fe2583'
                  }
                  alt="avt"
                  className="object-cover rounded-full w-full h-full"
                />
              </div>
              <div className="hidden group-hover:block absolute top-14 -left-14">
                <div className="py-3 min-w-[160px] border-gray-300  border border-solid rounded-lg bg-white relative  ">
                  <div className="">
                    <div
                      onClick={() =>
                        HandleDashboardNavigate(
                          `/admin/?tab=thong-tin-tai-khoan`
                        )
                      }
                      className="flex gap-2 items-center font-light hover:bg-gray-100 h-max py-2 px-5 text-[14px]  rounded-md cursor-pointer"
                    >
                      <IoSettingsOutline className="" />
                      <p className="w-max">Thông tin tài khoản</p>
                    </div>
                  </div>
                  <div className="text-red-500">
                    <div
                      onClick={() => {
                        setVerify(false);
                        HandleNavigate('/');
                      }}
                      className="flex gap-2 items-center font-light hover:bg-gray-100 h-max py-2 px-5 text-[14px]  rounded-md cursor-pointer"
                    >
                      <IoLogOut className="" />
                      <p className="w-max">Đăng xuất</p>
                    </div>
                  </div>
                  <div className="absolute w-4 h-4 border border-b-0 border-r-0 bg-white border-solid border-gray-300 -top-2 right-[50%] transform rotate-45 z-0"></div>
                  <div className="w-full h-10  bg-none absolute -top-5 "> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <MobileUI dict={dict} Key={Key} />
      </>

      <Modal
        footer={null}
        closeIcon={null}
        open={isModalOpen}
        destroyOnClose={true}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className=" relative w-full">
          <div className=" rounded-full border-mainyellow flex items-center ">
            <div className=" pl-4 w-full  justify-between items-center grid grid-cols-7">
              <div className="col-span-6  flex items-center gap-2">
                <FaSearch />
                <input
                  type="text"
                  className="outline-none w-full mr-4"
                  placeholder="Tìm kiếm chức nắng ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <div
                  className={`${
                    search ? 'block' : 'hidden'
                  }  bg-gray-500 text-gray-300 w-max p-1 rounded-full text-[10px] cursor-pointer`}
                  onClick={() => setSearch('')}
                >
                  <RxCross2 />
                </div>
              </div>
            </div>
          </div>
          {search && (
            <div className="absolute w-full bg-gray-100 top-full flex flex-col shadow-inner z-50 mt-5 ">
              <div className=" flex flex-col">
                {searchRs.map((product, idx) => {
                  const Icon = DashboardMapping[product.icon];
                  return (
                    <div
                      onClick={() => {
                        HandleDashboardNavigate(`/admin?tab=${product.value}`);
                        setIsModalOpen(false);
                        setSearch('');
                      }}
                      key={idx}
                      className="cursor-pointer hover:text-red-500 p-2 hover:bg-gray-200 flex items-center gap-2 text-[18px] font-LexendDeca font-light"
                    >
                      <Icon />
                      <p> {product.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Drawer
        open={isOpenDrawer}
        closeIcon={null}
        width={2000}
        destroyOnClose={true}
        onClose={() => setIsOpenDrawer(false)}
      >
        {/* <Cloud setIsOpen={setIsOpenModal} /> */}
      </Drawer>
    </div>
  );
};

export default Header;
