import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CardList from '../card/CardList';
import { GetSearchResultsResponse } from '@/pages/api/getSearchResults';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';

const SearchResultSection = () => {
  const [searchResult, setSearchResult] = useState<ParsedDatabaseItemType[]>(
    []
  );
  // query.query = 검색어 쿼리 내용(string | string[] | undefined)

  const { query } = useRouter();
  const searchQuery = query.query?.toString(); // ! undefined 일 수도 있으므로

  useEffect(() => {
    if (!searchQuery) return; // 타입가드

    const getSearchResult = async () => {
      const response = await fetch(
        `/api/getSearchResults?query=${searchQuery}`
      );
      if (!response.ok) throw new Error(response.statusText);

      const { databaseItems }: GetSearchResultsResponse = await response.json();
      setSearchResult(databaseItems);
    };
    getSearchResult();
  }, [searchQuery]);

  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-16">
        <CardList cardItems={searchResult} />
      </div>
    </section>
  );
};

export default SearchResultSection;
