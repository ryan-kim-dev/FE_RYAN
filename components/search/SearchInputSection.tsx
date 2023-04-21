import { AiOutlineSearch } from 'react-icons/ai';

const SearchInputSection = () => {
  return (
    <section className="bg-black">
      <div className="w-4/5 max-w-5xl mx-auto py-16">
        <form className="relative">
          <input type="text" className="w-full outline-none p-2 text-xl" />
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
