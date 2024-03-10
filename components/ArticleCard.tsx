import { Article } from 'utils/types';
import slugify from 'slugify';
import { motion } from "framer-motion";
import getLocalizedDate from 'utils/getLocalizedDate';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';



type Props = {
  article: Article;
 
};

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.title).toLowerCase();

  const formattedTime = getLocalizedDate(article.publishedDate);

  const publishDate = new Date(formattedTime);

  // NEW ARTICLE BADGE
  const showNewBadge =
    Math.abs(new Date(publishDate).getTime() - new Date().getTime()) /
      (24 * 60 * 60 * 1000) <
    30;


  return (
    // href={`/blog/${slug}`}
  <li  className='h-auto flex mb-4 py-2.5 group' >
      <div className="">
        
        <div className="" >
          <a href={`/blog/${slug}`}>
       
            <p className="text-[20px] ">{article.title} 
            {showNewBadge && (
              <span className="inline-block px-1.5 py-[1px] relative top-[2px] font-bold ml-2 text-[10px] uppercase rounded-full brand-gradient text-white bg-[#a516ef]">
                New
              </span>
            )}</p>
            </a>
      
          <div className="flex flex-row justify-start gap-8 text-[12px]">
          <time dateTime={formattedTime}>{formattedTime}</time>
            <div className="flex justify-end">
              {article.categories.map(category => (
                <div key={category}>
                  <span className="">#{category} </span>
                  <span aria-hidden="true">&middot;</span>
                </div>
              ))}
             
            </div>
            {/* <p className="text-sm font-medium text-gray-900">{article?.author?.name}</p> */}
          </div>
        </div>
      </div>
    </li>
  );
}
