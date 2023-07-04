import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import Link from 'next/link';
import Image from 'next/image';
import IconRenderer from './IconRenderer';
import TagList from './tag/TagList';

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { id, cover, icon, tags, created, description, title } = cardItem;

  return (
    <li>
      <Link href={`/blog/${id}`}>
        <div>
          <Image src={cover ? cover : ''} alt={title} fill />
        </div>

        <div>
          <h4>
            <IconRenderer icon={icon} />
            {title}
          </h4>
          <p>{description ? description : 'No description provided'}</p>
          <time>{created}</time>
        </div>
      </Link>
      {tags.length > 0 ? <TagList tags={tags} /> : null}
    </li>
  );
};

export default CardItem;
