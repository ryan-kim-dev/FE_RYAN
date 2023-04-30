import Link from 'next/link';
import { AiFillLinkedin, AiFillGithub, AiFillYoutube } from 'react-icons/ai';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">About Me</h1>
      <div className="text-lg font-medium">작업중...</div>
      <ul className="flex justify-center mt-10">
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
