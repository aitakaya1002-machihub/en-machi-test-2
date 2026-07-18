interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function FilterTabs({ categories, activeCategory, onSelect }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
          activeCategory === 'all'
            ? 'bg-[#4a5c4a] text-white border-[#4a5c4a]'
            : 'border-gray-200 text-gray-600 hover:border-gray-400'
        }`}
      >
        すべて
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
            activeCategory === cat
              ? 'bg-[#4a5c4a] text-white border-[#4a5c4a]'
              : 'border-gray-200 text-gray-600 hover:border-gray-400'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
