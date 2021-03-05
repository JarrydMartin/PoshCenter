import { User } from '@firebase/auth-types';
import { createContext } from 'react';
import { userModel } from './models';

export const UserContext = createContext<userModel>(null);