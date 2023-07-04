import { MultiSelectPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import TagList from '../card/tag/TagList';

interface TagContainerProps {
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

const TagContainer = ({ tags }: TagContainerProps) => {
  return (
    <section>
      <div>
        <TagList tags={tags} />
      </div>
    </section>
  );
};

export default TagContainer;
