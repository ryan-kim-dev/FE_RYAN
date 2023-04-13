import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import Link from 'next/link';
import Image from 'next/image';
import IconRenderer from './IconRenderer';

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { id, cover, icon, tags, created, description, title } = cardItem;

  return (
    <li className="overflow-hidden shadow-lg group flex flex-col">
      <Link href={`blog/${id}`}>
        <div className="relative aspect-[1.3/1]">
          <Image
            src={cover}
            alt={title}
            className="group-hover:scale-105 transform"
          />
        </div>

        <div className="p-4 flex-col gap-4">
          <h4 className="font-bold text-2xl group-hover:text-blue-500 transition-colors flex-row items-center gap-1">
            <IconRenderer icon={icon} />
            {title}
          </h4>
          <p className="font-medium text-gray-400">
            {description ? description : 'No description provided'}
          </p>
          <time className="font-medium text-gray-500 text-sm">{created}</time>
        </div>
      </Link>
    </li>
  );
};

export default CardItem;
