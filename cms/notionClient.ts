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
  // 노션 api 자체에서 아직 filter와 sort 옵션은 아래의 값들만 지원됨
  // 들어갈 수 있는 값 리스트 보기: ctrl + space
  const response = await notionClient.search({
    query,
    filter: {
      property: 'object',
      value: 'page',
    },
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });

  return response.results as (PageObjectResponse | PartialPageObjectResponse)[]; // type assertion (타입 단언) - 되도록 지양, 마지막으로 쓸것
};

/** 비공식 노션 Sdk 인스턴스 - react-notion-x로 노션 페이지 렌더링을 위해 사용 */
export const notion = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
};
