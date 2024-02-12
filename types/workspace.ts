type Member = {
  id: string;
  name: string;
  profilePicture: string;
};

export type WorkspaceProps = {
  iconUrl: string;
  thumbUrl: string;
  createdBy: string;
  updatedBy: string;
  productsCount: number;
  ordersCount: number;
  shippers: any[];
  socialProfiles: any[];
  members: Member[];
  contact: string;
  email: string;
  address: string;
  websiteUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  isDeleted: boolean;
  chatGptApiKey: string;
  skuSeparator: string;
  uniqueNo: number;
  webhookStatus: string;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};
