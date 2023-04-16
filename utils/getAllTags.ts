import { getDatabaseItems } from '@/cms/notionClient';
import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/** 노션 cms로부터 받아온 글들을 태그로 필터링 할 경우 태그들의 중복 제거를 위한 함수  */
// map, filter 등의 메서드 조합 대신 reduce를 사용하여 중복제거하므로 성능상의 이점이 있다
export const getAllTags = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  const tags = items.reduce<
    MultiSelectPropertyItemObjectResponse['multi_select']
  >((acc, item) => {
    if (!('properties' in item)) return acc; // 타입 가드

    const { Tags } = item.properties;
    const tags = Tags.type === 'multi_select' ? Tags.multi_select : [];

    tags.forEach((tag) => {
      // 중복제거 - 중복된 요소가 아닌 태그만 acc에 담는다
      const isAlreadyExist =
        acc.findIndex((accTag) => accTag.id === tag.id) > -1;

      if (!isAlreadyExist) acc.push(tag);
    });

    return acc;
  }, []);

  return tags;
};
