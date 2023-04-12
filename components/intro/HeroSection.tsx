import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
      <div className="flex flex-col md:items-start md:text-left gap-8 py-16 w-4/5 max-w-5xl mx-auto text-center">
        <span className="font-black text-6xl leading-[1.2] break-keep">
          Frontend developer
        </span>
        <span className="font-black text-6xl leading-[1.2] break-keep">
          Ryan Kim
        </span>
        <p className="font-light text-xl text-gray-400 md:max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          numquam corrupti, deserunt ipsa perferendis earum enim laudantium eos
          ex? Fuga quod consequatur omnis fugiat ducimus nulla, doloremque modi
          corrupti unde?
        </p>
        <div>
          <Link href="/about">
            <button className="px-4 py-2 border border-black  font-semibold flex-shrink-0 hover:bg-black hover:text-white">
              About Me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
