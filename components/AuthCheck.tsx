import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/contexts';
;

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { user } = useContext(UserContext);

  return user ? props.children : props.fallback || <p>You must be signed</p> ;
}