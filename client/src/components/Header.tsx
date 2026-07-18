import { useEffect, useMemo, useState } from "react";
import Link from "@/components/Link";
import type { SearchItem } from "@/lib/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Menu,
  X,
  Search,
  MapPin,
  FileText,
  Store,
  Calendar,
  Newspaper,
  Home,
  ArrowRight,
} from "lucide-react";
import type { RoutedPageProps } from "@/lib/page-props";

const navItems = [
  { label: "ホーム", href: "/" },
  { label: "円町を知る", href: "/area" },
  { label: "お店を探す", href: "/shops" },
  { label: "イベント", href: "/events" },
  { label: "ストーリー", href: "/stories" },
  { label: "machi-hubについて", href: "/machi-hub" },
  { label: "お知らせ", href: "/notices" },
];

function isActivePath(href: string, currentPath: string) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return (
    target.isContentEditable ||
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select"
  );
}

function getSectionIcon(section: string) {
  switch (section) {
    case "ストーリー":
      return FileText;
    case "お店":
      return Store;
    case "イベント":
      return Calendar;
    case "お知らせ":
      return Newspaper;
    default:
      return Home;
  }
}

export default function Header({ currentPath = "/" }: RoutedPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchLoadError, setSearchLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const visibleSearchItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim();

    if (!normalizedQuery) {
      const initialSectionLimits = new Map<string, number>([
        ["固定ページ", Number.POSITIVE_INFINITY],
        ["ストーリー", 3],
        ["お店", 3],
        ["イベント", 3],
        ["お知らせ", 3],
      ]);
      const sectionCounts = new Map<string, number>();

      return searchItems.filter(item => {
        const limit = initialSectionLimits.get(item.section);
        if (limit == null) {
          return false;
        }

        const count = sectionCounts.get(item.section) ?? 0;
        if (count >= limit) {
          return false;
        }

        sectionCounts.set(item.section, count + 1);
        return true;
      });
    }

    const keywords = normalizedQuery
      .toLocaleLowerCase("ja-JP")
      .split(/\s+/)
      .filter(Boolean);

    return searchItems.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.section,
        ...(item.keywords ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("ja-JP");

      return keywords.every(keyword => searchableText.includes(keyword));
    });
  }, [searchItems, searchQuery]);

  const groupedSearchItems = useMemo(() => {
    const groups = new Map<string, SearchItem[]>();

    for (const item of visibleSearchItems) {
      const currentItems = groups.get(item.section) ?? [];
      currentItems.push(item);
      groups.set(item.section, currentItems);
    }

    return Array.from(groups.entries());
  }, [visibleSearchItems]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isEditableTarget(event.target)
      ) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isSearchOpen || searchItems.length > 0 || isSearchLoading) {
      return;
    }

    setIsSearchLoading(true);
    setSearchLoadError(null);

    try {
      const source = document.getElementById("site-search-index")?.textContent;
      if (!source) {
        throw new Error("Search index script not found");
      }

      const data = JSON.parse(source) as SearchItem[];
      setSearchItems(data);
    } catch {
      setSearchLoadError(
        "検索データの読み込みに失敗しました。ページを再読み込みしてもう一度お試しください。"
      );
    } finally {
      setIsSearchLoading(false);
    }
  }, [isSearchLoading, isSearchOpen, searchItems.length]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-white/98 backdrop-blur-md shadow-sm" : "bg-white"} border-b border-gray-100`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand Mark */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* 円 symbol mark */}
              <div className="w-8 h-8 rounded-full border-2 border-[#4a5c4a] flex items-center justify-center transition-colors group-hover:bg-[#4a5c4a]/5">
                <span
                  className="text-[10px] font-bold text-[#4a5c4a]"
                  style={{ fontFamily: '"Noto Serif JP", serif' }}
                >
                  円
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900"
                  style={{
                    fontFamily: '"Noto Serif JP", serif',
                    letterSpacing: "-0.02em",
                  }}
                >
                  en-machi
                </span>
                <span className="text-[9px] lg:text-[10px] text-[#4a5c4a] -mt-0.5 tracking-wider uppercase">
                  by machi-hub
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors relative ${
                    isActivePath(item.href, currentPath)
                      ? "text-[#4a5c4a] font-medium"
                      : "text-gray-600 hover:text-[#4a5c4a]"
                  }`}
                >
                  {item.label}
                  {isActivePath(item.href, currentPath) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4a5c4a] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/area"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#4a5c4a]/30 text-sm text-[#4a5c4a] hover:bg-[#4a5c4a]/5 transition-colors"
              >
                <MapPin size={13} />
                <span>エリアマップ</span>
              </Link>
              <button
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600"
                aria-label="検索"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={18} />
                <span className="hidden xl:inline text-xs text-gray-400">
                  /
                </span>
              </button>
              <button
                className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="メニュー"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="max-w-[1280px] mx-auto px-4 py-4 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-sm text-sm transition-colors ${
                    isActivePath(item.href, currentPath)
                      ? "bg-[#4a5c4a]/5 text-[#4a5c4a] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <Search size={14} />
                サイト内検索
              </button>
              <Link
                href="/area"
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#4a5c4a] hover:bg-[#4a5c4a]/5 rounded-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin size={14} />
                エリアマップ
              </Link>
            </nav>
          </div>
        )}
      </header>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-2xl overflow-hidden p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>サイト内検索</DialogTitle>
            <DialogDescription>
              記事・お店・イベント・お知らせを横断検索できます。
            </DialogDescription>
          </DialogHeader>
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-gray-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="キーワードで検索"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="max-h-[65vh] overflow-y-auto">
            {isSearchLoading && (
              <div className="px-4 py-6 text-sm text-gray-500">
                検索データを読み込んでいます...
              </div>
            )}
            {searchLoadError && !isSearchLoading && (
              <div className="px-4 py-6 text-sm text-red-600">
                {searchLoadError}
              </div>
            )}
            {!isSearchLoading && !searchLoadError && (
              <>
                {groupedSearchItems.length === 0 && (
                  <div className="px-4 py-6 text-sm text-gray-500">
                    該当するページが見つかりませんでした。
                  </div>
                )}
                {groupedSearchItems.map(([section, items]) => (
                  <section
                    key={section}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <div className="px-4 py-2 text-xs font-medium text-gray-500">
                      {section}
                    </div>
                    {items.map(item => {
                      const Icon = getSectionIcon(section);

                      return (
                        <button
                          type="button"
                          key={item.href}
                          onClick={() => {
                            setIsSearchOpen(false);
                            window.location.assign(item.href);
                          }}
                          className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          <Icon
                            className="mt-0.5 shrink-0 text-[#4a5c4a]"
                            size={16}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium">
                              {item.title}
                            </div>
                            {item.description && (
                              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                                {item.description}
                              </p>
                            )}
                            <div className="mt-1 text-[11px] text-gray-400">
                              {item.href}
                            </div>
                          </div>
                          <ArrowRight
                            className="mt-1 shrink-0 text-gray-300"
                            size={14}
                          />
                        </button>
                      );
                    })}
                  </section>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
