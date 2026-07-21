import { useEffect, useState } from 'react';

interface ContentFilterProps {
  scopeId: string;
  categories: string[];
  defaultCategory?: string;
}

function parseFilterValues(value?: string) {
  return (value ?? '')
    .split('||')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ContentFilter({
  scopeId,
  categories,
  defaultCategory = 'all',
}: ContentFilterProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) {
      return;
    }

    const items = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-filter-item]'),
    );

    let visibleCount = 0;

    for (const item of items) {
      const values = parseFilterValues(item.dataset.filterValues);
      const isVisible =
        activeCategory === 'all' || values.includes(activeCategory);

      item.hidden = !isVisible;
      item.setAttribute('aria-hidden', String(!isVisible));

      if (isVisible) {
        visibleCount += 1;
      }
    }

    const emptyState = scope.querySelector<HTMLElement>('[data-filter-empty]');
    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }, [activeCategory, scopeId]);

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        type="button"
        onClick={() => setActiveCategory('all')}
        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
          activeCategory === 'all'
            ? 'bg-[#4a5c4a] text-white border-[#4a5c4a]'
            : 'border-gray-200 text-gray-600 hover:border-gray-400'
        }`}
      >
        すべて
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setActiveCategory(category)}
          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
            activeCategory === category
              ? 'bg-[#4a5c4a] text-white border-[#4a5c4a]'
              : 'border-gray-200 text-gray-600 hover:border-gray-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
