import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'data/siteData';
import Spotify from './Spotify';

export default function Footer() {
  return (
    <footer className="py-2 bg-white dark:bg-[#161615] border-t">
         
      <Container>
        <div className="md:flex md:items-center md:justify-between">
          <Socials />
          <Spotify/>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base text-center text-gray-400">{siteData.footerText}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
