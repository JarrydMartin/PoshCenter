import { User } from '@firebase/auth-types';
import { createContext } from 'react';
import { UserModel } from './models';

export const UserContext = createContext<UserModel>(null);