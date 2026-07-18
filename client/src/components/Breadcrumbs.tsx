import Link from '@/components/Link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6" aria-label="パンくずリスト">
      <Link href="/" className="hover:text-[#4a5c4a] transition-colors">ホーム</Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight size={10} />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#4a5c4a] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
