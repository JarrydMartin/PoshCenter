import layout from "../styles/main-layout.module.css";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React from "react";
import Link from "next/link";
import AuthButton from "../components/AuthButton";
import { Layout } from "../components/Layout";

function Home() {
  const AuthUser = useAuthUser();
  return (
    <Layout AuthUser={AuthUser}>
      <Link href="/article/create">
        <a>
          <button type="button">New Article</button>
        </a>
      </Link>
    </Layout>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
