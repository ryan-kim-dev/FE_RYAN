import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import Link from 'next/link';
import Image from 'next/image';

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { id, cover, icon, tags, created, description, title } = cardItem;

  return (
    <li className="overflow-hidden shadow-lg group">
      <Link href={`blog/${id}`}>
        <div className="relative aspect-[1.3/1]">
          <Image
            src={cover}
            alt={title}
            className="group-hover:scale-105 transform"
          />
        </div>

        <div className="p-6 flex-col gap-5">
          <h4 className="font-bold text-2xl group-hover:text-blue-500 transition-colors">
            #icon#{title}
          </h4>
          <p className="font-medium text-gray-400">
            {description ? description : 'No description provided'}
          </p>
          <time className="font-medium text-gray-500">{created}</time>
        </div>
      </Link>
    </li>
  );
};

export default CardItem;
