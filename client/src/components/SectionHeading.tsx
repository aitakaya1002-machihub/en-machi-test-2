import Link from '@/components/Link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  title: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeading({ title, href, linkText = 'すべて見る' }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between mb-6 lg:mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 bg-[#4a5c4a] rounded-full" />
        <h2 className="text-lg lg:text-xl font-medium tracking-tight" style={{ fontFamily: '"Noto Serif JP", serif' }}>
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-xs text-[#4a5c4a] hover:gap-2 transition-all font-medium">
          {linkText}
          <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}
