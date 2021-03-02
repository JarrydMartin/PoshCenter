import layout from '../../styles/main-layout.module.css'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import React from 'react'
import AuthButton from '../../components/AuthButton'


function  Home() {
  const AuthUser = useAuthUser()
  return (
    <div className={layout.pageWrap}>
    <header className={layout.pageHeader}>
      Posh Centre
    </header>
    <nav className={layout.pageNav}>
        <AuthButton AuthUser={AuthUser} />
    </nav>
    <main className={layout.pageMain}>
    </main>
    <aside className={layout.pageSidebar}>
      Aside
    </aside>
    <footer className={layout.pageFooter}>
      Footer
    </footer>
  </div>
  )
}
export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser() (Home);