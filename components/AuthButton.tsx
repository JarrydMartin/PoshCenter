import Link from 'next/link'
import { AuthUserContext } from 'next-firebase-auth'
import React from 'react'

const AuthButton = ({AuthUser}:{AuthUser:AuthUserContext}) => {
    return (
          AuthUser.email ?  <button
            type="button"
            onClick={() => {
              AuthUser.signOut()
            }}
          >Sign out</button> :
          <Link href="/auth">
            <a>
              <button type="button" >
                Sign in
              </button>
            </a>
          </Link>
    )
}

export default AuthButton
