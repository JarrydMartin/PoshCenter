import { User } from '@firebase/auth-types';
import { createContext } from 'react';
import { UserData, UserModel } from './models';



export const UserContext = createContext<UserData>(null);