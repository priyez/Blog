import Container from 'components/Container';
// import Socials from 'components/Socials';
import ThemeSwitch from 'components/ThemeSwitch';
import siteData from 'data/siteData';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed z-10 w-full backdrop-blur bg-[rgb(255 255 255 / 80%)] dark:bg-[rgba(21,21,20,.8)]">
      <Container>
        <div className="flex justify-between w-full py-4 ">
          <Link href="/" passHref>
            <div className="text-[16px] w-[50%] font-bold cursor-pointer"></div>
          </Link>
          <ThemeSwitch />
        </div>
      </Container>
    </div>
  );
}
