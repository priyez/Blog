import Container from 'components/Container';
import SubscribeInput from './SubscribeInput';

export default function Subscribe() {
  return (
    <div className="py-24 ">
      <Container>
        <div className="text-2xl font-bold ">
          Subscribe 
        </div>
        <div className="max-w-2xl mx-auto mt-4 text-[1rem]">
         Get an email when i write new posts and early access to new
          articles.
        </div>
        <SubscribeInput />
      </Container>
    </div>
  );
}
