import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import { Article, ArticleSkeleton } from "@components/index";
import Layout from "../../components/layouts/Layout";
import { HOST } from "../../config";

export default function ArticlePage({ article }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <ArticleSkeleton />
      </Layout>
    );
  }
  Article;
  return (
    <Layout>
      <Article article={article} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  // Compile esnasında render almaya gerek yok her sayfayı
  const paths = [];

  return {
    paths,
    fallback: true, // Sayfa ilk kez ziyaret ediliyorsa istemciye json data gidecek
  };
};

export async function getStaticProps(context) {
  const { article_slug } = context.params;
  const res = await fetch(`${HOST}/api/articles/${article_slug}`);
  var article;
  try {
    article = await res.json();
  } catch (error) {}
  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
  };
}