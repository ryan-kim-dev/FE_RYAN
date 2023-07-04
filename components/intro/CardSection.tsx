import CardList from '../card/CardList';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';

interface CardSectionProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardSection = ({ cardItems }: CardSectionProps) => {
  return (
    <section>
      <div>
        <h3>Posts</h3>
        <CardList cardItems={cardItems} />
        {/* pagination */}
      </div>
    </section>
  );
};

export default CardSection;
