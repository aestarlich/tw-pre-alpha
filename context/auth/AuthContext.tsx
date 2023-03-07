

import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user: IUser;

    loginUser: (email: string, password: string) => Promise<{status: number, data?: IUser, message: string}>;
    registerUser: (username: string, image: string, name: string, email: string, password: string) => Promise<{ status: number, message: string, data?: IUser }>;
    logout: () => void;
    updateUserData: (email: string, value: string | number, entity: string) => Promise<{ status: number, message: string, data?: IUser }>;
}


export const AuthContext = createContext({} as ContextProps );