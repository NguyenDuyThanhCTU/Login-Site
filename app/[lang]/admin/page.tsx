import { AccountProps, PostProps } from '@assets/props';
import AccountIF from '@components/dashboard/Account/AccountIF';
import General from '@components/dashboard/Account/General';
import AdminPage from '@components/dashboard/AdminPage';
import Collection from '@components/dashboard/Comunity/Collection';
import Slide from '@components/dashboard/Comunity/Slide';
import SocialMedia from '@components/dashboard/Comunity/SocialMedia/SocialMedia';
import ConfigPage from '@components/dashboard/Config/ConfigPage';
import Branch from '@components/dashboard/Plugins/Branch';
import Posts from '@components/dashboard/Posts/Posts';
import { find, findById } from '@config/api/api';
import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import Error from '@components/dashboard/Authorization/Error';
import ListProduct from '@components/dashboard/Product/ProductList';
import ProductCategory from '@components/dashboard/Product/ProductCategory';
import { firebaseConfig } from '@config/firebase/Firebase';
import Header from '@components/layout/dashboard/Header';
import PostsCategory from '@components/dashboard/Posts/PostsCategory';
import Partner from '@components/dashboard/Plugins/Partner';
import FeedBack from '@components/dashboard/Plugins/FeedBack';
import Test from '@components/dashboard/Test/Test';
import Guarantee from '@components/dashboard/Plugins/Guarantee';

export const metadata: Metadata = {
  title: 'Quản trị website',
};

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: 'vi' | 'cn' | 'en' };
}

const DashboardPage = async ({ searchParams, params }: DashboardPageProps) => {
  const searchValue = searchParams.tab;
  const keyValue: any = searchParams.key;
  const strCurrentUser = atob(keyValue);
  const decodeAccount = decodeURIComponent(strCurrentUser);
  const CurrentUser: AccountProps = JSON.parse(decodeAccount);
  const ConfigData = await find(CurrentUser.firebaseConfig, 'Config', true);
  const ProductsData = await find(CurrentUser.firebaseConfig, 'Products', true);

  const PostsData = await find(CurrentUser.firebaseConfig, 'Posts', true);
  const dict = await getDictionary(params.lang);
  let componentToRender;
  switch (searchValue) {
    case 'home':
      if (CurrentUser.feature?.includes('home')) {
        componentToRender = <AdminPage Data={PostsData} Config={ConfigData} />;
      }
      break;
    case 'cau-hinh':
      if (CurrentUser.feature?.includes('cau-hinh')) {
        componentToRender = <ConfigPage Data={ConfigData} />;
      }
      break;
    case 'danh-sach-san-pham':
      if (CurrentUser.feature?.includes('cau-hinh')) {
        const ProductCategoryTag = await find(
          CurrentUser.firebaseConfig,
          'ProductCategory',
          true
        );
        componentToRender = (
          <ListProduct Category={ProductCategoryTag} Data={ProductsData} />
        );
      }

      break;
    case 'danh-muc-san-pham':
      if (CurrentUser.feature?.includes('cau-hinh')) {
        const Type = await find(
          CurrentUser.firebaseConfig,
          'ProductCategory',
          true
        );
        const SaleData = await find(CurrentUser.firebaseConfig, 'Sale', true);
        const SaleInfo = ConfigData?.find(
          (item: any) => item.id === 'sales',
          true
        );
        componentToRender = (
          <ProductCategory
            CategoryData={Type}
            SaleInfo={SaleInfo}
            SaleData={SaleData}
            ProductData={ProductsData}
          />
        );
      }

      break;
    case 'danh-sach-bai-viet':
      if (CurrentUser.feature?.includes('danh-sach-bai-viet')) {
        const CategoryData = await find(
          CurrentUser.firebaseConfig,
          'PostCategory',
          true
        );
        const filterData = PostsData?.filter(
          (items: any) => items.id !== 'introductory'
        );
        componentToRender = (
          <Posts PostsData={filterData} Category={CategoryData} />
        );
      }

      break;
    case 'danh-muc-bai-viet':
      if (CurrentUser.feature?.includes('danh-muc-bai-viet')) {
        const Category = await find(
          CurrentUser.firebaseConfig,
          'PostCategory',
          true
        );

        const Introductory: any = await findById(
          CurrentUser.firebaseConfig,
          'Posts',
          'introductory',
          true
        );
        componentToRender = (
          <PostsCategory IntroData={Introductory} Data={Category} />
        );
      }

      break;

    case 'kenh-truyen-thong':
      if (CurrentUser.feature?.includes('kenh-truyen-thong')) {
        const SocialMediaData = await findById(
          CurrentUser.firebaseConfig,
          'Config',
          'SocialMedia'
        );
        componentToRender = <SocialMedia Data={SocialMediaData} />;
      }

      break;
    case 'slide-gioi-thieu':
      if (CurrentUser.feature?.includes('slide-gioi-thieu')) {
        const SlideData = await find(
          CurrentUser.firebaseConfig,
          'Slides',
          true
        );
        const SlidePosts = PostsData?.filter(
          (item: PostProps) => item.id !== 'introductory'
        );
        componentToRender = (
          <Slide
            ProductsData={ProductsData}
            PostsData={SlidePosts}
            Data={SlideData}
          />
        );
      }

      break;
    case 'bo-suu-tap':
      if (CurrentUser.feature?.includes('bo-suu-tap')) {
        const CollectionData = await find(
          CurrentUser.firebaseConfig,
          'Collections',
          true
        );
        const ImageFiltered = CollectionData?.filter(
          (item: any) => item.type === 'hinh-anh'
        );
        const VideoFiltered = CollectionData?.filter(
          (item: any) => item.type === 'video'
        );
        componentToRender = (
          <Collection
            Data={CollectionData}
            ImageFiltered={ImageFiltered}
            VideoFiltered={VideoFiltered}
          />
        );
      }

      break;
    case 'doi-tac':
      if (CurrentUser.feature?.includes('doi-tac')) {
        const PartnerData = await find(
          CurrentUser.firebaseConfig,
          'Partner',
          true
        );
        componentToRender = <Partner Data={PartnerData} />;
      }

      break;
    case 'chi-nhanh':
      if (CurrentUser.feature?.includes('chi-nhanh')) {
        const BranchData = await find(
          CurrentUser.firebaseConfig,
          'Branches',
          true
        );
        componentToRender = <Branch Data={BranchData} />;
      }

      break;

    case 'phan-hoi-cua-khach-hang':
      if (CurrentUser.feature?.includes('phan-hoi-cua-khach-hang')) {
        const FeedBackData = await find(
          CurrentUser.firebaseConfig,
          'FeedBacks',
          true
        );

        componentToRender = <FeedBack Data={FeedBackData} />;
      }

      break;
    case 'thong-tin-tai-khoan':
      if (CurrentUser.feature?.includes('phan-hoi-cua-khach-hang')) {
        componentToRender = <AccountIF />;
      }

      break;
    case 'don-hang':
      if (CurrentUser.feature?.includes('don-hang')) {
        componentToRender = <Test />;
      }

      break;
    case 'quan-ly-tai-khoan':
      if (CurrentUser.role === 'Admin') {
        const AccountData = await find(firebaseConfig, 'Accounts', true);
        componentToRender = <General Data={AccountData} />;
      } else {
        componentToRender = <Error />;
      }

      break;
    case 'bao-hanh':
      if (CurrentUser.role === 'Admin') {
        const GuaranteeData = await find(firebaseConfig, 'Guarantee', true);
        componentToRender = (
          <Guarantee Data={GuaranteeData} ProductData={ProductsData} />
        );
      }

      break;
    default:
      componentToRender = null;
  }

  return (
    <div className="font-LexendDeca font-extralight ">
      <div className="fixed w-full top-0 z-50">
        <Header dict={dict} Key={keyValue} />
      </div>
      <div className="p:mt-[84px] d:mt-[64px] py-5  d:mx-auto p:mx-2 d:text-[18px] p:text-[14px]  bg-slate-100 overflow-y-hidden overflow-x-auto">
        {componentToRender}
      </div>
    </div>
  );
};

export default DashboardPage;
