import { getDatabaseItems } from '@/cms/notionClient';
import TagContainer from '@/components/tags/TagContainer';
import TagHeroSection from '@/components/tags/TagHeroSection';
import { getAllTags } from '@/utils/getAllTags';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { GetStaticProps } from 'next';

interface TagsIndexPageProps {
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  return (
    <div className="h-[calc(100vh-72px-88px)]">
      <TagHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  const tags = getAllTags(databaseItems);

  return {
    props: {
      tags,
    },
  };
};
