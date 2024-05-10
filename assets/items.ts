export const verify = false;

import {
  FaPhoneSquareAlt,
  FaSearchLocation,
  FaTiktok,
  FaUser,
  FaYoutube,
} from 'react-icons/fa';
import { IoMdMail, IoMdTime } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { AiFillInstagram } from 'react-icons/ai';
import { BsFacebook, BsMessenger } from 'react-icons/bs';
import { SiZalo } from 'react-icons/si';
import { HiOutlineUserGroup } from 'react-icons/hi';

export const HeaderItems = [
  {
    label: '',
    value: '',
  },
];

interface IconMappingType {
  [key: string]: IconType;
}

export const IconBlogFormMapping: IconMappingType = {
  FaUser: FaUser,
  FaPhoneSquareAlt: FaPhoneSquareAlt,
  FaSearchLocation: FaSearchLocation,
  IoMdMail: IoMdMail,
  IoMdTime: IoMdTime,
};

export const IconSocialMediaMapping: IconMappingType = {
  FaYoutube: FaYoutube,
  FaTiktok: FaTiktok,
  AiFillInstagram: AiFillInstagram,
  BsMessenger: BsMessenger,
  HiOutlineUserGroup: HiOutlineUserGroup,
  BsFacebook: BsFacebook,
  SiZalo: SiZalo,
};
