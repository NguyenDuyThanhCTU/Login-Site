'use client';
import { useStateProvider } from '@context/StateProvider';
import { Drawer } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoListSharp } from 'react-icons/io5';
import { FaCaretRight } from 'react-icons/fa';
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

const MobileUI = ({ dict, Key }: { dict: any; Key: string }) => {
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<number>(0);
  const { currentUser, HandleDashboardNavigate, setVerify } = useAuth();
  const { HandleNavigate } = useStateProvider();
  const DashboardHeader =
    currentUser.role === 'Standard'
      ? dict.DashboardPage.StandardHeader
      : currentUser.role === 'Pro'
      ? dict.DashboardPage.ProHeader
      : currentUser.role === 'Advance'
      ? dict.DashboardPage.AdvanceHeader
      : currentUser.role === 'Admin' && dict.DashboardPage.AdminHeader;
  return (
    <div className="d:hidden p:block h-[84px] ">
      <div className=" h-full bg-white  text-black shadow-xl">
        <div className="px-4 w-full flex justify-between items-center">
          <div
            onClick={() => HandleDashboardNavigate(`/admin?tab=home`)}
            className="h-[84px] w-[130px]"
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/ads-company-285a6.appspot.com/o/ADS.png?alt=media&token=e8ebc77d-d9b8-4bdf-9052-a484b53909e3"
              alt="Logo"
              width={150}
              height={84}
              className="w-full h-full p-2"
            />
          </div>
          <div className="border-2 rounded-xl border-gray-500">
            <div
              className="text-[25px] bg-gray-100 p-2 rounded-xl"
              onClick={() => setOpen(true)}
            >
              <IoListSharp />
            </div>
          </div>
        </div>

        <Drawer
          placement="left"
          closable={false}
          width={300}
          onClose={() => setOpen(false)}
          open={open}
        >
          <div className=" ">
            <div
              onClick={() => {
                HandleDashboardNavigate(`/admin?tab=home`);
                setOpen(false);
              }}
              className="p-5"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ads-company-285a6.appspot.com/o/ADS.png?alt=media&token=e8ebc77d-d9b8-4bdf-9052-a484b53909e3"
                alt="logo"
              />
            </div>

            <div>
              <div className="flex flex-col mt-2 font-LexendDeca font-light">
                {DashboardHeader.map(
                  (item: AdminPageHeaderItemsProps, idx: number) => (
                    <div key={idx}>
                      <div
                        className={`${
                          idx + 1 === isSelected
                            ? 'text-red-500 '
                            : 'text-black'
                        } cursor-pointer border-b  py-2 flex justify-between items-center`}
                        onClick={() => setIsSelected(idx + 1)}
                      >
                        <div
                          onClick={() => {
                            HandleDashboardNavigate(
                              `/admin?tab=${item.value}&key=${Key}`
                            );
                            setOpen(false);
                          }}
                        >
                          {item.label}
                        </div>
                        {item?.children.length > 0 && (
                          <FaCaretRight
                            className={`${
                              idx + 1 === isSelected ? 'rotate-90 ' : 'rotate-0'
                            } duration-300`}
                          />
                        )}
                      </div>
                      {item?.children.length > 0 && (
                        <div
                          className={`flex flex-col gap-2 py-2 ml-4 duration-300 ${
                            idx + 1 === isSelected ? 'h-max ' : 'hidden'
                          }`}
                        >
                          {item?.children.map((child, idx) => (
                            <div
                              onClick={() => {
                                setOpen(false);
                                HandleDashboardNavigate(
                                  `/admin?tab=${item.value}`
                                );
                              }}
                              key={idx}
                              className="cursor-pointer"
                            >
                              {child.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
                <div
                  onClick={() => {
                    setVerify(false);
                    HandleNavigate('/');
                  }}
                  className="cursor-pointer border-b hover:text-red-500 duration-300 py-2"
                >
                  Thoát
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileUI;
