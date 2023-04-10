import { getDatabaseItems } from '@/cms/notionClient';
import { parseDatabaseItems } from '@/utils/parseDatabaseItem';
import { GetStaticProps } from 'next';
import HeroSection from '@/components/intro/HeroSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // 타입 가드
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems);
  console.log(parsedDatabaseItems);

  return {
    props: {},
  };
};
