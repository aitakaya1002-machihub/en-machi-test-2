import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface AreaCategory {
  label: string;
  icon: string;
}

interface AreaCategoryFilterProps {
  scopeId: string;
  categories: AreaCategory[];
}

function parseFilterValues(value?: string) {
  return (value ?? '')
    .split('||')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AreaCategoryFilter({
  scopeId,
  categories,
}: AreaCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) {
      return;
    }

    const intro = scope.querySelector<HTMLElement>('[data-area-intro]');
    const empty = scope.querySelector<HTMLElement>('[data-area-empty]');
    const countRow = scope.querySelector<HTMLElement>('[data-area-count-row]');
    const countValue = scope.querySelector<HTMLElement>('[data-area-count]');
    const title = scope.querySelector<HTMLElement>('[data-area-title]');
    const sections = Array.from(
      scope.querySelectorAll<HTMLElement>('[data-area-section]'),
    );

    if (!activeCategory) {
      if (title) {
        title.textContent = 'カテゴリーを選んで探す';
      }
      if (intro) {
        intro.hidden = false;
      }
      if (empty) {
        empty.hidden = true;
      }
      if (countRow) {
        countRow.hidden = true;
      }
      for (const section of sections) {
        section.hidden = true;
      }
      return;
    }

    if (title) {
      title.textContent = `「${activeCategory}」で探す`;
    }
    if (intro) {
      intro.hidden = true;
    }

    let totalVisible = 0;

    for (const section of sections) {
      const items = Array.from(
        section.querySelectorAll<HTMLElement>('[data-area-item]'),
      );

      let visibleInSection = 0;

      for (const item of items) {
        const values = parseFilterValues(item.dataset.areaCategories);
        const isVisible = values.includes(activeCategory);

        item.hidden = !isVisible;
        item.setAttribute('aria-hidden', String(!isVisible));

        if (isVisible) {
          visibleInSection += 1;
          totalVisible += 1;
        }
      }

      section.hidden = visibleInSection === 0;
    }

    if (countRow) {
      countRow.hidden = false;
    }
    if (countValue) {
      countValue.textContent = String(totalVisible);
    }
    if (empty) {
      empty.hidden = totalVisible > 0;
    }
  }, [activeCategory, scopeId]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-base font-medium">カテゴリーで探す</h2>
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          disabled={!activeCategory}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            activeCategory
              ? 'border-[#4a5c4a]/20 bg-[#4a5c4a]/5 text-[#4a5c4a] hover:bg-[#4a5c4a]/10 hover:border-[#4a5c4a]/30'
              : 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <RotateCcw size={12} />
          リセット
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((category) => (
          <button
            key={category.label}
            type="button"
            onClick={() => setActiveCategory(category.label)}
            className={`flex items-center gap-3 p-4 border rounded-sm transition-colors text-left ${
              activeCategory === category.label
                ? 'border-[#4a5c4a] bg-[#4a5c4a]/5 text-[#4a5c4a]'
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        6つの分類から選ぶと、お店・イベント・ストーリー・お知らせを横断して絞り込めます。
      </p>
    </div>
  );
}
