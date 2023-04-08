import { Client } from '@notionhq/client';

// 무조건 서버사이드에서만 실행된다
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
