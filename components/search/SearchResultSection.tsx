import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CardList from '../card/CardList';

const SearchResultSection = () => {
  // query.query = 검색어 쿼리 내용(string | string[] | undefined)

  const { query } = useRouter();
  const searchQuery = query.query?.toString(); // ! undefined 일 수도 있으므로

  useEffect(() => {
    if (!searchQuery) return; // 타입가드

    const getSearchResult = async () => {
      const response = await fetch(
        `/api/getSearchResults?query=${searchQuery}`
      );
      const { results } = await response.json();
      console.log(results);
    };
    getSearchResult();
  }, [searchQuery]);

  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-16">
        <CardList cardItems={[]} />
        {query.query}
      </div>
    </section>
  );
};

export default SearchResultSection;
