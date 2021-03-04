import { User } from '@firebase/auth-types';
import { createContext } from 'react';

export const UserContext = createContext<User>(null);