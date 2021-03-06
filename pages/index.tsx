
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { ArticleType } from "../lib/models";
import { GetArticleTypes } from "../lib/dataAccess";
import ArticleIndexAside from "../components/ArticleIndexAside";
import { useUser } from "../lib/hooks";

function Home() {
  const {user, isSignedIn, canEdit} =  useUser();
  return (
    <Layout user={user} canEdit={canEdit} isSignedIn={isSignedIn}>
    </Layout>
  );
}
export default (Home);
