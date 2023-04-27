import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInputSection = () => {
  const { push, query } = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = query.query?.toString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = searchValue.trim(); // 검색어 쿼리의 공백 제거
    if (!trimmedValue) return alert('검색어를 입력해주세요.');
    // https://frontdev.tistory.com/entry/BASE-20%EC%9D%B4%EB%9E%80

    push(`/search?query=${trimmedValue}`);
  };

  useEffect(() => {
    setSearchValue(searchQuery ?? '');
  }, [searchQuery]);

  return (
    <section className="bg-black">
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full outline-none p-2 text-xl"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-200 hover:rounded-full hover:p-1 transition duration-2"
          >
            <AiOutlineSearch className="text-2xl" color="gray" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchInputSection;
