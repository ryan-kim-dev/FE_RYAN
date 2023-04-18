import { Client } from '@notionhq/client';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';

// 무조건 서버사이드에서만 실행된다
/** 공식 노션 Sdk 인스턴스 */
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface DatabaseQueryOptions {
  filter?: {
    tagName?: string;
  };
}

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOptions
) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Tags',
          multi_select: {
            contains: option?.filter?.tagName ?? '',
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Created',
        direction: 'descending',
      },
    ],
  });

  return response.results;
};

/** 노션db의 글 목록에서 글 제목으로 검색 */
export const getSearchResults = async (query: string) => {
  const response = await notionClient.search({
    query,
  });

  return response.results as (PageObjectResponse | PartialPageObjectResponse)[];
};

/** 비공식 노션 Sdk 인스턴스 - react-notion-x로 노션 페이지 렌더링을 위해 사용 */
export const notion = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
};
