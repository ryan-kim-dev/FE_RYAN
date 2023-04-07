import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import IconButton from '../common/IconButton';

const Header = () => {
  const navLinks = [
    {
      name: 'Tags',
      link: '/tags',
    },
    {
      name: 'About',
      link: '/about',
    },
  ];

  return (
    <>
      <header className="bg-white fixed top-0 w-full z-50">
        <nav className="p-4 flex flex-row justify-between max-w-5xl mx-auto">
          <h1 className="font-black text-4xl">
            <Link href="/">RK</Link>
          </h1>
          <ul className="flex flex-row gap-2 items-center">
            {navLinks.map(({ name, link }) => (
              <li key={name} className="text-gray-600 font-medium">
                <Link
                  href={link}
                  className="p-3 hover:bg-gray-100 rounded-md hover:text-black"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search">
                <IconButton
                  icon={<AiOutlineSearch size={'1.5rem'} color="white" />}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* 본문이 헤더를 침범히지 않기 위한 인슐레이터 */}
      <div className="h-[72px]" />
    </>
  );
};

export default Header;
