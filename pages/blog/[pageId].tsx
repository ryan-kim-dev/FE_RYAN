import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getPageContent } from '@/cms/notionClient';
import { ExtendedRecordMap } from 'notion-types';
import { getDatabaseItems } from '@/cms/notionClient';
import NotionPageRenderer from '@/components/notion/NotionPageRenderer';

interface BlogPageDetailProps {
  recordMap: ExtendedRecordMap;
}
interface BlogPageDetailParams extends ParsedUrlQuery {
  pageId: string;
}

const BlogPageDetail = ({ recordMap }: BlogPageDetailProps) => {
  return <NotionPageRenderer recordMap={recordMap} />;
};

export default BlogPageDetail;

export const getStaticProps: GetStaticProps<
  BlogPageDetailProps,
  BlogPageDetailParams
> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);

  return {
    props: {
      recordMap,
    },
  };
};

export const getStaticPaths = async () => {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
