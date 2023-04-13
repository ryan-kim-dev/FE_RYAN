import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItem';
import Image from 'next/image';

interface IconRendererProps {
  icon: ParsedDatabaseItemType['icon'];
}

const IconRenderer = ({ icon }: IconRendererProps) => {
  if (!icon) return null;
  if (icon.type === 'emoji') return <span>{icon.emoji}</span>;

  const iconUrl = icon.type === 'file' ? icon.file.url : icon.external.url;

  return (
    <Image
      src={iconUrl}
      width={28}
      height={28}
      alt="icon"
      className="rounded-full flex flex-row items-center gap-1"
    />
  );
};

export default IconRenderer;
