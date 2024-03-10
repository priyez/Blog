import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticlePage, getArticlePageData } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import { renderBlocks } from 'components/notionBlocks/renderBlocks';
import getLocalizedDate from 'utils/getLocalizedDate';
import Container from 'components/Container';
import slugify from 'slugify';
import { FiShare2 } from "react-icons/fi"
import ArticleList from 'components/ArticleList';
import siteData from 'data/siteData';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import { useRouter } from 'next/router';
// import linkedin from 'react-useanimations/lib/linkedin';
import Subscribe from 'components/Subscribe';
import { FacebookShare } from 'react-share-kit';
import { WhatsappShare } from 'react-share-kit';
import { TwitterShare } from 'react-share-kit'
import { EmailShare } from 'react-share-kit'



const socials = [
  {
    title: 'Github',
    href: siteData.github,
    icon: {
    name: 'GitHub',
    animation: github
    }
 
  }
  
];

const ArticlePage = ({
  content,
  title,
  coverImage,
  publishedDate,
  summary,
  moreArticles
}) => {
  const publishedOn = getLocalizedDate(publishedDate);

  const slug = slugify(title).toLowerCase();
;

  const ogImage = `${siteData.websiteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`;

  const [iconSize, setIconSize] = useState(18);

    useEffect(() => {
    const handleResize = () => {
      // Update icon size based on screen width
      if (window.innerWidth >= 768) {
        setIconSize(18); // Desktop size
      } else {
        setIconSize(22); // Mobile size
      }
    };

    // Set initial size
    handleResize();

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount


  const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';


  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = () => {
    const input = document.querySelector('.field input') as HTMLInputElement;
    if (input) {
      input.select(); //select input value
      if (document.execCommand('copy')) {
        //if the selected text is copied
        const field = document.querySelector('.field') as HTMLElement;
        const copy = document.querySelector('.field button') as HTMLElement;

        field.classList.add('active');
        if (copy) {
          copy.innerText = 'Copied';
        }
        setTimeout(() => {
          window.getSelection()?.removeAllRanges(); //remove selection from page
          field.classList.remove('active');
          if (copy) {
            copy.innerText = 'Copy';
          }
        }, 3000);
      }
    }
  };
  
  return (
    <>
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/blog/${slug}`}
      >
        <div>
          <div className="px-6 py-16 pb-48 mx-auto -mb-48  md:pb-96 md:-mb-96">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-2 space-x-2 text-sm ">
                
              </div>
              <div className="font-extrabold tracking-tight  text-w-4xl text-[2rem] md:text-4xl">
                {title}
              </div>
              <div className="max-w-3xl mx-auto mt-3 text-[1rem] leading-8 sm:mt-4">
                {summary}
              </div>
            </div>
            <div className="md:flex md:items-center md:justify-center">
            <figcaption className="mt-6 flex md:items-center md:justify-center space-x-4 text-left">
              <img src={siteData.profileUrl} alt="" className="w-14 h-14 rounded-full" />
              <div>
                <div className="text-slate-900 font-semibold dark:text-white">{siteData.author}</div>
                <div className="mt-0.5 text-sm leading-6"> Published on  {publishedOn}</div></div>
                </figcaption>
          <div className="mt-8 md:mt-0 md:order-1 flex justify-between md:p-5 md:w-[20%] w-[60%]">
          {socials.map(item => (
        <a
          key={item.title}
          href={item.href}
          className="transform flex pr-2 pl-2 border-solid border-black dark:border-white border-[1px] rounded-[50px] filter hover:contrast-50"
          target="_blank"
          rel="noreferrer"
        >
           <UseAnimations animation={item.icon.animation} className="md:mt-auto mt-[3%]" size={iconSize} autoplay={true} strokeColor="#333" />
        <p className="md:text-[12px] text-[18px]">{item.title}</p>
         
        </a>
      ))}
       <span
          className="transform flex pr-2 pl-2 border-solid border-black dark:border-white border-[1px] rounded-[50px] filter hover:contrast-50"
          onClick={toggleModal}
        >
           <FiShare2 className="md:mt-auto mt-[8%]" size={14} />
        <p className="md:text-[12px] text-[18px]">Share</p>
         
        </span>

          </div>
        </div>
            
           
          </div>

          <div className="max-w-5xl mx-auto my-16 md:px-8">
            <img className="object-cover w-full md:rounded-xl aspect-video" src={coverImage} />
          </div>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {content.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>


{/* // Share Modal */}

{isOpen && (
  <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-neutral-800   p-8 rounded-lg shadow-lg transition-all duration-200 opacity-100">
    <header className="flex items-center justify-between pb-4 border-b border-gray-300">
      <span className="text-xl font-semibold">Share  Now!</span>
      <div
        className="close flex text-[65px] items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200 hover:text-black text-white transition-colors duration-300"
        onClick={toggleModal}
      >
        &times;
      </div>
    </header>
    <div className="content mt-5">
      <p>Share this link via</p>
      <ul className="icons flex space-x-3 mt-2">
        <li className="md:px-[25px]">
          <span
            className="flex  items-center justify-center w-12 h-12 rounded-full border border-transparent hover:bg-blue-500 transition-colors duration-300"
          >
           <FacebookShare size={35} round={true} url={currentUrl} quote={title} />
          </span>
        </li>
        <li className="md:px-[25px]">
          <span
            className="flex items-center justify-center w-12 h-12 rounded-full border border-transparent hover:bg-blue-500 transition-colors duration-300"
          >
           <WhatsappShare size={35} round={true} url={currentUrl} title={title} />
          </span>
        </li>
        <li className="md:px-[25px]">
          <span
            className="flex items-center justify-center w-12 h-12 rounded-full border border-transparent hover:bg-blue-500 transition-colors duration-300"
          >
           <TwitterShare size={35} round={true} url={currentUrl} title={title} />
          </span>
        </li>
        <li className="md:px-[25px]">
          <span
            className="flex items-center justify-center w-12 h-12 rounded-full border border-transparent hover:bg-blue-500 transition-colors duration-300"
          >
           <EmailShare size={35} round={true} url={currentUrl}  subject={title} body="body" />
          </span>
        </li>
      </ul>
      <p className="mt-4">Or copy link</p>
      <div className="field mt-2 flex items-center border border-gray-300 rounded-[1rem] px-2">
        <i className="url-icon uil uil-link text-xl "></i>
        <input
          type="text"
          readOnly
          value={currentUrl}
          className="flex-1 outline-none px-2 py-1 text-blue-600 bg-[transparent]"
        />
        <button
          onClick={copyToClipboard}
          className="ml-2 px-4 py-1 text-white  transition-colors duration-300"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
)}

          <div className="py-6 md:hidden">
            <Subscribe/>
            <Container>
              <div className="flex items-center justify-between my-8">
                <div className="text-2xl font-bold">Latest articles</div>
                <Link href="/">
                  <span className="font-semibold  cursor-pointer">
                    More articles ➜
                  </span>
                </Link>
              </div>
              <ArticleList articles={moreArticles} />
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  data.forEach(result => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(result.properties.title.title[0].plain_text).toLowerCase()
        }
      });
    }
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const page = getArticlePage(data, slug);
  const result = await getArticlePageData(page, slug, process.env.BLOG_DATABASE_ID);

  return {
    props: result,
    revalidate: 30
  };
};

export default ArticlePage;
