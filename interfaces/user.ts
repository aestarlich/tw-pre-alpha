export interface IUser {
  _id       : string;
  username  : string;
  name      : string;
  email     : string;
  password  : string;
  role      : string;
  isPro     : boolean;
  image?    : string;
  metrics: IUserMetrics;
  createAt?: string;
  updateAt?: string;
}

export interface IPostUser {
  _id         : string;
  username    : string;
  name        : string;
  email       : string;
  password    : string;
  role?       : string;
  isPro?      : boolean;
  image?      : string;
  metrics?: IUserMetrics; 
  createAt?: string;
  updateAt?: string;
}

export interface IUserMetrics {
  weight    : number;
  massUnit  : string;
  height    : number;
  metricUnit: string;
}