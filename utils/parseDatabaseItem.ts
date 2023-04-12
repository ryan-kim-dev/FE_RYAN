import { getDatabaseItems } from '@/cms/notionClient';
import {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'; // 노션 sdk에서 타입 가져오기

export interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  icon: PageObjectResponse['icon']; // 별도로 파싱할 렌더러 추후 처리
  tags: MultiSelectPropertyItemObjectResponse['multi_select']; // 별도로 파싱할 렌더러에서 추후 처리
  created: string;
  description: string;
  title: string;
}

/** 노션 DB에서 받아온 배열 데이터를 내부에서 정제하여 배열에 담아 반환하는 함수 */
export const parseDatabaseItems = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  /** 노션 DB에서 받아온 배열 데이터를 정제하여 담는다 */
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    // 타입가드 - PartialPageObjectResponse 타입이 아니라 PageObjectResponse 타입만 허용
    if (!('properties' in item)) return acc; // PageObjectResponse에만 properties가 있음

    const { id, icon, cover, created_time } = item; // 타입가드 안하면 item: PageObjectResponse | PartialPageObjectResponse

    // 정제한 데이터에 담기 위해 노션 DB 데이터에서 필요한 데이터만 추출
    const { Description, Tags, Name } = item.properties;

    // 글 커버 cover 파싱
    // cover 타입이 여러개이므로 삼항연산자로 분기처리 + null 병합 연산자로 coalescing 처리
    const parsedCover =
      cover?.type === 'file' ? cover.file.url : cover?.external.url ?? '';

    // * 발행일 파싱 : 동작 안됨
    // const parsedCreatedDate =
    //   (Created.type === 'date' ? Created.date?.start : '') ?? '';

    // 글 설명 파싱
    const description =
      (Description.type === 'rich_text'
        ? Description.rich_text?.[0]?.plain_text
        : '') ?? '';

    // 글 제목 파싱
    const title =
      (Name.type === 'title' ? Name.title?.[0]?.plain_text : '') ?? '';

    // 태그 파싱
    const tags = Tags.type === 'multi_select' ? Tags.multi_select : [];

    // 정제한 데이터에 담기
    const parsedResult = {
      id,
      cover: parsedCover,
      icon,
      tags,
      created: created_time,
      description,
      title,
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
};

/**
 [
  {
    object: 'page',
    id: '9bb77e9a-da6e-4bf5-a61c-0f9237e192a7',
    created_time: '2022-12-26T03:54:00.000Z',
    last_edited_time: '2023-04-08T03:32:00.000Z',
    created_by: { object: 'user', id: 'b7408a53-7186-446b-a9c7-5ec8e626c79b' },
    last_edited_by: { object: 'user', id: 'b7408a53-7186-446b-a9c7-5ec8e626c79b' },
    cover: null,
    icon: null,
    parent: {
      type: 'database_id',
      database_id: 'somedatabaseidhided'
    },
    archived: false,
    properties: {
      Created: [Object],
      Slug: [Object],
      Description: [Object],
      Updated: [Object],
      Tags: [Object],
      Published: [Object],
      Name: [Object]
    },
    url: 'https://www.notion.so/Event-Loop-Call-Stack-9bb77e9ada6e4bf5a61c0f9237e192a7'
  }
]
 */
