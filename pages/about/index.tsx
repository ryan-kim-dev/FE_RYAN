import Link from 'next/link';
import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from 'react-icons/ai';

const AboutPage = () => {
  return (
    <div>
      <h1>About Me</h1>
      <div>작업중...</div>
      <ul>
        <li>
          <Link href="https://www.linkedin.com/in/ryankim-fe">
            <AiFillLinkedin />
          </Link>
        </li>
        <li>
          <Link href="https://github.com/ryan-kim-dev">
            <AiFillGithub />
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/@feryan8247">
            <AiFillYoutube />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
