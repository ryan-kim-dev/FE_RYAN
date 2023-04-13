import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

// 무조건 서버사이드에서만 실행된다
/** 공식 노션 Sdk 인스턴스 */
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
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

/** 비공식 노션 Sdk 인스턴스 - react-notion-x로 노션 페이지 렌더링을 위해 사용 */
export const notion = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const recordMap = await notion.getPage(pageId);
  return recordMap;
};
