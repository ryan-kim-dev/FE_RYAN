import { COLOR_TABLE } from '@/constants';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import Link from 'next/link';

interface TagItemProps {
  tagItem: ParsedDatabaseItemType['tags'][number]; // ['tags']중 몇번째 어떤 타입의 요소인지 모르므로 number로 지정
}

const TagItem = ({ tagItem }: TagItemProps) => {
  const { name, color } = tagItem;
  return (
    <li style={{ backgroundColor: COLOR_TABLE[color] }}>
      <Link href={`/tags/${name.toLowerCase()}`}>{name}</Link>
    </li>
  );
};

export default TagItem;
