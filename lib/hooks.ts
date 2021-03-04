import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { GetArticleTypes } from "./dataAccess";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  return user;
}