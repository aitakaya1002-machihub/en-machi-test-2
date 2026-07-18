import Link from '@/components/Link';
import type { ShopFrontmatter } from '@/lib/content-types';

interface ShopCardProps {
  shop: ShopFrontmatter;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const categories = shop.categories.length > 0 ? shop.categories : [shop.category];

  return (
    <Link href={`/shops/${shop.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-sm mb-3">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-medium mb-1 group-hover:text-[#4a5c4a] transition-colors" style={{ fontFamily: '"Noto Serif JP", serif' }}>
        {shop.name}
      </h3>
      <span className="text-xs text-[#4a5c4a]">{categories.map((category, index) => (
        <span key={`${shop.slug}-${category}`}>
          {index > 0 ? ' / ' : ''}
          #{category}
        </span>
      ))}</span>
    </Link>
  );
}
