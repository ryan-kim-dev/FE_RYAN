import { getDatabaseItems } from '@/cms/notionClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllTags } from '@/utils/getAllTags';
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from '@/utils/parseDatabaseItem';
import CardSection from '@/components/intro/CardSection';
import TagHeroSection from '@/components/tags/TagHeroSection';

interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
  tagName: string;
}

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
}

const TagPage = ({ databaseItems, tagName }: TagPageProps) => {
  return (
    <div>
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} />
    </div>
  );
};

export default TagPage;

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName } = params!;
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1); // 첫글자만 대묹로

  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID, {
    filter: {
      tagName: pascalTagName,
    },
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      tagName: pascalTagName,
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
