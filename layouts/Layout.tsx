import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import Preloader from '../components/preLoader'



// const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
// const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl } = props;
  const [isLoading, setIsLoading] = useState(true);

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };

  useEffect( () => {
    (
      async () => {
          

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 4000)
      }
    )()
  }, [])

  return (
    <>
      
      <MetaHead {...metaHeadProps} />
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      <div className="pt-14 overflow-hidden">
        {children}
   
      </div>
    

      <Footer />
     
    </>
  );
}
