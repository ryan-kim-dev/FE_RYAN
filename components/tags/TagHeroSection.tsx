interface TagHeroSectionProps {
  subtitle?: string;
  title?: string;
}

const TagHeroSection = ({
  subtitle = 'Tag Collection',
  title = 'All Tags',
}: TagHeroSectionProps) => {
  return (
    <section>
      <div>
        <p>{subtitle}</p>

        <h2>{title}</h2>
      </div>
    </section>
  );
};

export default TagHeroSection;
