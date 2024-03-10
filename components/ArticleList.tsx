
import { Article } from 'utils/types';
import ArticleCard from './ArticleCard';

import React, { useRef, useState } from "react";

type Props = {
  articles: Article[];
};

export default function ArticleList({ articles }: Props) {


  return (
    <>
    <div className="flex w-full">
        <div className="md:w-[20%] md:flex hidden"></div>
    <div className="md:w-[60%] w-full"> <ul className="sm-[100%] animated-list" >
      {articles.map(article => (
        <ArticleCard article={article}  key={article.id} />
      ))}
    </ul></div>
    <div className="w-[20%] md:flex hidden"></div>
</div>
    </>
   
  );
}
