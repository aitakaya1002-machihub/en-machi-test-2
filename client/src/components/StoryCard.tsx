import Link from '@/components/Link';
import type { StoryFrontmatter } from '@/lib/content-types';

interface StoryCardProps {
  story: StoryFrontmatter;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-sm mb-3">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-medium leading-relaxed mb-2 group-hover:text-[#4a5c4a] transition-colors" style={{ fontFamily: '"Noto Serif JP", serif' }}>
        {story.title}
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {story.tags.map((tag) => (
          <span key={tag} className="text-[#4a5c4a]">#{tag}</span>
        ))}
        <span className="ml-auto">{story.date}</span>
      </div>
    </Link>
  );
}
