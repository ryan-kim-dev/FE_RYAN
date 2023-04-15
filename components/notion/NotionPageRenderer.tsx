import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import TagItem from '../card/tag/TagItem';

// * 렌더링 최적화를 위한 지연 로딩 - react-notion-x 패키지 용량 꽤 크다.
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
  {
    ssr: false,
  }
);

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (mod) => mod.Collection
  )
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(
    (mod) => mod.Equation
  )
);

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap;
}

const NotionPageRenderer = ({ recordMap }: NotionPageRendererProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      disableHeader
      fullPage
      showTableOfContents
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        nextLink: Image,
        nextImage: Link,
        propertySelectValue: ({ option: { id, color, value: name } }) => {
          // 구조분해할당 2번 사용하기
          // option을 구조분해할당으로 받아와서
          // option 안의 color, id, value를 다시 구조분해할당으로 받아온다.
          // 구조분해할당 2번 사용 + value를 name으로 바꿔서 사용
          return (
            <TagItem
              key={id}
              tagItem={{
                id,
                name,
                color,
              }}
            />
          );
        },
      }}
    />
  );
};

export default NotionPageRenderer;
