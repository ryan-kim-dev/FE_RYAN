import { getDatabaseItems } from '@/cms/notionClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllTags } from '@/utils/getAllTags';
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from '@/utils/parseDatabaseItem';

interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
}

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
}

const TagPage = ({ databaseItems }: TagPageProps) => {
  console.log(databaseItems);

  return <div>tag</div>;
};

export default TagPage;

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName } = params!;

  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID, {
    filter: {
      tagName: tagName[0].toUpperCase() + tagName.slice(1), // 첫글자만 대묹로
    },
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  const tags = getAllTags(databaseItems); // 중복 제거된 태그 목록

  const paths = tags.map(({ name: tagName }) => ({
    params: {
      tagName: tagName.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
