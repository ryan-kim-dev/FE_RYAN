import CardItem from './CardItem';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';

interface CardListProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardList = ({ cardItems }: CardListProps) => {
  if (cardItems.length === 0)
    return (
      <div className="w-4/5 max-w-5xl mx-auto my-16">
        <p className="text-center text-2xl">검색 결과가 없습니다.</p>
      </div>
    );
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardItems.map((cardItem) => (
        <CardItem key={cardItem.id} cardItem={cardItem} />
      ))}
    </ul>
  );
};

export default CardList;
