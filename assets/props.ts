export interface HeaderClientProps {
  label: string;
  value: string;
  children: CategoryProps[];
}

//Config Props
export interface InformationProps {
  ImageNotFound: string;
  NotFoundNavigate: string;
  LogoSnippet: string;
  LogoPosition: string;
  ogimage: string;
  ogtitle: string;
  ogdescription: string;
  twimage: string;
  twdescription: string;
  twtitle: string;
  analytics: string;
  remakerting: string;
  livechat: string;
  tag: Array<string>;
}

export interface ContactProps {
  id: string;
  WebsiteAddress: string;
  Hotline: string;
  PhoneNumber: string;
  Email: string;
  WebsiteTime: string;
  CompanyTime: string;
  CompanyAddress: string;
  LogoWebsite: string | any;
  GoogleMap: string;
  direct: string;
  HotlineEN: string;
  PhoneNumberEN: string;
  WebsiteTimeEN: string;
  CompanyTimeEN: string;
  CompanyAddressEN: string;
}

export interface SEOProps {
  Title: string;
  Description: string;
  Favicon: string | any;
  Keyword: [];
  TitleEN?: string;
  DescriptionEN?: string;
  KeywordEN: string;
}

// Product

export interface CategoryProps {
  id: string;
  stt: number;
  level0: string;
  level1: Array<string>;
  date: string;
  [key: string]: any;
}

export interface ProductProps {
  id: string;
  title: string;
  url: string;
  stt: number;
  image: string;
  date: string;
  price?: string;
  level0: string;
  level1?: string;
  level2?: any;
  discount?: number;
  discountedAmount?: string;
  newPrice?: string;
}

export interface ProductDetailProps extends ProductProps {
  subimage?: {
    uid: string;
    url: string;
  }[];
  content?: string;
  description?: string;
  detail?: string;
  describe?: string;
  Keyword?: [] | any;
}

export interface SaleInfoProps {
  date: string;
  start: string;
  end: string;
  note?: string;
}

export interface SaleDataProps extends ProductProps {
  id: string;
  stt: number;
  // discount: string;
  // discountedAmount: string;
  // newPrice: string;
}

// Post

export interface PostProps {
  id: string;
  stt: number;
  title: string;
  url: string;
  level0: string;
  date: string;
  image: string;
  keyword?: [];
  level1?: string;
  description?: string;
  content?: string;
  tags?: Array<string>;
}

export interface introductoryProps {
  content: string;
  shortDescription: string;
  date: string;
  image: string;
  level0: 'Introductory';
}

// Media

export interface SocialMediaProps {
  date: string;
  facebook?: string;
  zalo?: string;
  fanpage?: string;
  messenger?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export interface SocialMediaDashboardProps {
  title: string;
  icon: string;
  image: string;
  style: string;
  field: string;
  Data: string | undefined;
}

export interface SlideProps {
  id: string;
  image: string;
  type?: string;
  url?: string;
  date: string;
  stt: number;
}

export interface CollectionProps {
  id: string;
  stt: number;
  date: string;
  image: string;
  type: String;
  video?: string;
  embedVideo: string;
  title?: string;
}

//Account

export interface FirebaseConfigProps {
  apiKey: string;
  appId: string;
  authDomain: string;
  storageBucket: string;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
}

export interface AccountProps {
  stt: number;
  id: string;
  name: string;
  username: string;
  password: string;
  feature: Array<string>;

  role: 'Standard' | 'Pro' | 'Advance' | 'Admin';
  apiKey: string;
  appId: string;
  firebaseConfig: FirebaseConfigProps;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
  date: string;
  status: 'active' | 'block';
  websiteUrl: string;
  image?: string;
  phone?: string;
  email?: string;
  token?: string;
  address?: string;
  dateofbirth?: string;
  gender?: string;
  introduce?: string;
  Multilingual?: boolean;
}

//Plugin

export interface BranchProps {
  stt: number;
  title: string;
  address: string;
  date: string;
  hotline?: string;
  name?: string;
  timeactive?: string;
}

export interface PartnerProps {
  id: string;
  title: string;
  image: string;
  date: string;
  url: string;
}

export interface GuaranteeProps {
  id: string;
  phonenumber: string;
  guaranteeCode: string;
  userID: string;
  name: string;
  GuaranteeList: {
    expirationDate: string;
    daysRemaining: string;
    productID: string;
  };
}

export interface FeedbackProps {}
