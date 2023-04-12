import { getDatabaseItems } from '@/cms/notionClient';
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from '@/utils/parseDatabaseItem';
import { GetStaticProps } from 'next';
import HeroSection from '@/components/intro/HeroSection';
import CardSection from '@/components/intro/CardSection';

interface HomeProps {
  databaseItems: ParsedDatabaseItemType[];
}

const Home = ({ databaseItems }: HomeProps) => {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={databaseItems} />
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

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
  };
};
