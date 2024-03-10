import { convertToArticleList, getAllArticles } from 'utils/notion';
import { Layout } from 'layouts/Layout';
// import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { useState } from 'react';
import ArticleList from 'components/ArticleList';
// import { filterArticles } from 'utils/filterArticles';
// import Category from 'components/Category';

export default function Index({ articles, categories }) {
   const [search, setSearch] = useState("");
  const filteredArticles = articles.filter(({title, summary}) => {
  const searchString = `${title.toLowerCase()} ${summary.toLowerCase()}`;
    return searchString.includes(search.toLowerCase());
    });
  return (
    <Layout>

<div className="flex w-full">
        <div className="md:w-[25%] md:flex hidden"></div>
    <div className="md:w-[50%]  w-full"> 
    <div className="flex flex-col justify-center gap-4 md:px-10 px-5 py-4 mt-4">
           
            <p
              className="text-secondary animate-in"
              
            >
              I write about CSS, animation techniques, Web & Front-end Development and more.
            </p>
          </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
       <input
              id="search"
              type="search"
              placeholder="Search…"
              value={search}
              className="w-[90%] px-5 py-3 text-base bg-[#d1d5db] dark:bg-[#353636]  border border-transparent rounded-[3rem] shadow-sm"
              onChange={(e) => setSearch(e.target.value)}
              // pfix={<IconSearch className="w-5 h-5 text-secondary" />}
            />
            
      </div>
    </div>
    <div className="w-[25%] md:flex hidden"></div>
</div>

     
      <Container>
        <div className="py-8">
          
          <ArticleList articles={filteredArticles} />
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const { articles } = convertToArticleList(data);

  return {
    props: {
      articles,
      
    },
    revalidate: 30
  };
};
