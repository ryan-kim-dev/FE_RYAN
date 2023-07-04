import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
      <div>
        <span>Frontend developer</span>
        <span>Ryan Kim</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
          numquam corrupti, deserunt ipsa perferendis earum enim laudantium eos
          ex? Fuga quod consequatur omnis fugiat ducimus nulla, doloremque modi
          corrupti unde?
        </p>
        <div>
          <Link href="/about">
            <button>About Me</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
