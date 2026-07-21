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
  { label: "machi-hubについて", href: "/about" },
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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isMenuOpen
            ? "bg-white/95 backdrop-blur-xl border-b border-transparent shadow-none"
            : scrolled
              ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100"
              : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="group block">
              <img
                src="/placeholders/en-machi_bymachihub.webp"
                alt="en-machi by machi-hub"
                className="h-9 lg:h-11 w-auto transition-opacity group-hover:opacity-85"
              />
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
                className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                  isMenuOpen
                    ? "bg-[#4a5c4a] text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="メニュー"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-overlay"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu-overlay"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-y-contain bg-white/96 backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <div className="min-h-[100dvh]">
          <div
            className={`mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-24 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMenuOpen ? "translate-y-0" : "translate-y-3"
            }`}
          >
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a5c4a]/50">
                Menu
              </p>
            </div>

            <nav className="flex flex-1 flex-col">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between border-b border-[#4a5c4a]/10 py-4 text-lg transition-all duration-500 ${
                      isActivePath(item.href, currentPath)
                        ? "text-[#4a5c4a]"
                        : "text-gray-900"
                    } ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                    style={{ transitionDelay: `${120 + index * 45}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span
                      className="font-medium"
                      style={{ fontFamily: '"Noto Serif JP", serif' }}
                    >
                      {item.label}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-[#4a5c4a]/50 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>

              <div
                className={`mt-auto grid gap-3 pt-8 transition-all duration-500 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "260ms" }}
              >
                <button
                  type="button"
                  className="flex items-center justify-between rounded-2xl border border-[#4a5c4a]/10 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:bg-[#4a5c4a]/[0.03]"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Search size={16} className="text-[#4a5c4a]" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        サイト内検索
                      </div>
                      <div className="text-xs text-gray-500">
                        記事・お店・イベントを探す
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#4a5c4a]/50" />
                </button>

                <Link
                  href="/area"
                  className="flex items-center justify-between rounded-2xl border border-[#4a5c4a]/10 bg-[#4a5c4a]/[0.04] px-4 py-4 text-left shadow-sm transition-colors hover:bg-[#4a5c4a]/[0.08]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[#4a5c4a]" />
                    <div>
                      <div className="text-sm font-medium text-[#4a5c4a]">
                        エリアマップ
                      </div>
                      <div className="text-xs text-[#4a5c4a]/70">
                        円町の見どころを見る
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#4a5c4a]/50" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

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
