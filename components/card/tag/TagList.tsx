import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import TagItem from './TagItem';

interface TagListProps {
  tags: ParsedDatabaseItemType['tags'];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul>
      {tags.map((tag) => (
        <TagItem key={tag.id} tagItem={tag} />
      ))}
    </ul>
  );
};

export default TagList;
