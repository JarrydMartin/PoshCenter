
import React from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";

function Home() {
  return (
    <Layout>
      <Link href="/article/create">
        <a>
          <button type="button">New Article</button>
        </a>
      </Link>
    </Layout>
  );
}
export default (Home);
