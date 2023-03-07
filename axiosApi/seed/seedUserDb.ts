import * as bcrypt from 'bcryptjs';

interface SeedUser {
  name    : string;
  username: string;
  email   : string;
  password: string;
  role    : 'admin' | 'user';
  isPro   : boolean;
  image   : string;
  metrics: {
    height  : number;
    weight  : number;
    massUnit: 'kg' | 'lbs';
    metricUnit: 'cm' | 'in';
  }
}

export const initialUserData: SeedUser[] = [
  {
    name    : 'Alejandro Estarlich',
    username: 'aestarlich',
    email   : 'aestarlich@gymapp.com',
    password: bcrypt.hashSync('AlejandroGymApp2022'),
    role    : 'admin',
    isPro   : true,
    image: '',
    metrics: {
      height  : 0,
      weight  : 0,
      massUnit: 'kg',
      metricUnit: 'cm'
    }
  },
  {
    name    : 'Eladio Loriente',
    username: 'eloriente',
    email   : 'eloriente@gymapp.com',
    password: bcrypt.hashSync('EladioGymApp2022'),
    role    : 'admin',
    isPro   : true,
    image: '',
    metrics: {
      height  : 190,
      weight  : 99,
      massUnit: 'kg',
      metricUnit: 'cm'
    }
  },
  {
    name    : 'Turbo Admin',
    username: 'tadmin',
    email   : 'tadmin@gymapp.com',
    password: bcrypt.hashSync('TurboAdminGymApp2022'),
    role    : 'admin',
    isPro   : true,
    image: '',
    metrics: {
      height  : 0,
      weight  : 0,
      massUnit: 'kg',
      metricUnit: 'cm'
    }
  },
  {
    name    : 'Turbo Client',
    username: 'tclient',
    email   : 'tclient@gymapp.com',
    password: bcrypt.hashSync('TurboClientGymApp2022'),
    role    : 'user',
    isPro   : true,
    image: '',
    metrics: {
      height  : 0,
      weight  : 0,
      massUnit: 'kg',
      metricUnit: 'cm'
    }
  },
];