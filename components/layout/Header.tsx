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
      <header>
        <nav>
          <h1>
            <Link href="/">RK</Link>
          </h1>
          <ul>
            {navLinks.map(({ name, link }) => (
              <li key={name}>
                <Link href={link}>{name}</Link>
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
      <div />
    </>
  );
};

export default Header;
