import { getDatabaseItems } from '@/utils/notionClient';
import { GetStaticProps } from 'next';

const Home = () => {
  return <div>Home</div>;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // 타입 가드
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  console.log(databaseItems);

  return {
    props: {},
  };
};
