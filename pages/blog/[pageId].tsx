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

// 제네릭 안에 , 로 여러 타입 매개변수를 동시에 지정 가능
// getStaticProps: 동적 데이터를 사용하여 정적인 페이지 생성 시 사용.
// getStaticProps는 빌드 시점에 호출되며, 빌드 시점에 정적인 페이지를 생성한다.
export const getStaticProps: GetStaticProps<
  BlogPageDetailProps,
  BlogPageDetailParams
> = async ({ params }) => {
  const { pageId } = params!;
  // !를 뒤에 붙여 undefined가 아님(반드시 있는 값임)을 타입스크립트에 알림
  // !주의: params가 undefined일 경우, 에러가 발생하므로 반드시 params가 undefined가 아님을 보장해야 한다.

  const recordMap = await getPageContent(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  };
};

// getStaticPaths: 동적 라우팅 사용 시, 미리 빌드할 페이지 경로를 지정한다
// 빌드 시점에 호출되며 빌드 시점에 미리 빌드할 페이지 경로를 지정한다.
export const getStaticPaths = async () => {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error('NOTION_DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(process.env.NOTION_DATABASE_ID);
  const paths = databaseItems.map(({ id: pageId }) => ({
    // 구조분해할당으로 id의 값을 뽑아 pageId 변수에 담는다.
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: false, // 없는 경로로 접근 시 404 페이지를 보여준다.
    // true로 줄 경우 블로그 글이 많을 떄 서버에서 일부만 빌드하고
    // 없는 경로 접근 시 로딩 페이지를 띄우고 (useRouter 사용)
    // 클라이언트에서 필요한 부분만 빌드하는 방식으로 성능을 향상시킬 수 있다.
    // blocking 옵션을 줄 경우 true와 같이 동작하지만, 로딩 중임을 보여줄 수는 없다. (빈 페이지만 보여줌)
  };
};
