import RootLayout from '@/components/layout/RootLayout';
import type { AppProps } from 'next/app';
// css import 순서도 중요하다.
// 1. 노션 스타일링 먼저
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import '@/styles/notionStyle.scss';
// 2. 기본 css를 노션 스타일링에 덮어씌우기 - 폰트와 global css
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
