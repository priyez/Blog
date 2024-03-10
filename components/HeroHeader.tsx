import siteData from 'data/siteData';
import Container from './Container';



export default function HeroHeader() {
  return (
    <div className="py-24 r">
      <Container>
      
      
        <div className="max-w-2xl mx-auto mt-2 text-xl">
          {siteData.headerDescription}
        </div>

       
      </Container>
    </div>
  );
}
