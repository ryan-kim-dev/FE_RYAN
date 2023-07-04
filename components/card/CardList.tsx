import CardItem from './CardItem';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';

interface CardListProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardList = ({ cardItems }: CardListProps) => {
  if (cardItems.length === 0)
    return (
      <div>
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  return (
    <ul>
      {cardItems.map((cardItem) => (
        <CardItem key={cardItem.id} cardItem={cardItem} />
      ))}
    </ul>
  );
};

export default CardList;
