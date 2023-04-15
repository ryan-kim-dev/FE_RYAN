import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

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
        propertyDateValue: (value) => {
          console.log(value);
        },
        // propertySelectValue: ({ value }) => {},
      }}
    />
  );
};

export default NotionPageRenderer;
