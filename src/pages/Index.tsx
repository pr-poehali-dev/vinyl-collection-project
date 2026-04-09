import { useState } from "react";
import Icon from "@/components/ui/icon";

const RECORDS = [
  {
    id: 1,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    genre: "Джаз",
    price: "3 200 ₽",
    condition: "VG+",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/33eb30d3-fa62-467e-b860-e192c4f8f2de.jpg",
  },
  {
    id: 2,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    genre: "Рок",
    price: "4 800 ₽",
    condition: "NM",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/c40ca6ad-98da-47ba-bfef-0050d8bd7993.jpg",
  },
  {
    id: 3,
    title: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    genre: "Поп-рок",
    price: "2 900 ₽",
    condition: "VG",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/faed310b-1cdf-49f8-b5da-1f878787be0d.jpg",
  },
  {
    id: 4,
    title: "A Love Supreme",
    artist: "John Coltrane",
    year: 1965,
    genre: "Джаз",
    price: "5 100 ₽",
    condition: "NM",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/33eb30d3-fa62-467e-b860-e192c4f8f2de.jpg",
  },
  {
    id: 5,
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    year: 1971,
    genre: "Рок",
    price: "3 600 ₽",
    condition: "VG+",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/c40ca6ad-98da-47ba-bfef-0050d8bd7993.jpg",
  },
  {
    id: 6,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Поп",
    price: "2 400 ₽",
    condition: "VG",
    cover: "https://cdn.poehali.dev/projects/75f66409-36e2-4598-917f-5eae8560968c/files/faed310b-1cdf-49f8-b5da-1f878787be0d.jpg",
  },
];

const GENRES = [
  { name: "Джаз", count: 48, icon: "🎺" },
  { name: "Рок", count: 134, icon: "🎸" },
  { name: "Классика", count: 67, icon: "🎻" },
  { name: "Блюз", count: 39, icon: "🎵" },
  { name: "Соул", count: 52, icon: "🎤" },
  { name: "Поп", count: 91, icon: "🎶" },
];

const CONDITION_COLORS: Record<string, string> = {
  NM: "bg-green-800 text-green-100",
  "VG+": "bg-amber-700 text-amber-100",
  VG: "bg-yellow-700 text-yellow-100",
};

type Section = "home" | "catalog" | "genres" | "contacts";

function RecordCard({ record, delay = 0 }: { record: typeof RECORDS[0]; delay?: number }) {
  return (
    <div
      className="card-hover border overflow-hidden animate-fade-in-up opacity-0 cursor-pointer"
      style={{
        backgroundColor: "var(--parchment)",
        borderColor: "var(--sepia)",
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={record.cover}
          alt={record.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-0.5 rounded text-xs font-oswald uppercase tracking-wide ${CONDITION_COLORS[record.condition] || "bg-gray-700 text-gray-100"}`}>
            {record.condition}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="font-oswald text-xs uppercase tracking-widest mb-1" style={{ color: "var(--sepia)" }}>
          {record.genre} · {record.year}
        </div>
        <h3 className="font-playfair font-bold text-lg leading-tight mb-0.5" style={{ color: "var(--dark-brown)" }}>
          {record.title}
        </h3>
        <p className="font-cormorant italic text-base mb-3" style={{ color: "var(--warm-brown)" }}>
          {record.artist}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-playfair font-bold text-xl" style={{ color: "var(--amber)" }}>
            {record.price}
          </span>
          <button
            className="font-oswald text-xs uppercase tracking-wide px-4 py-2 transition-all hover:scale-105"
            style={{ backgroundColor: "var(--warm-brown)", color: "var(--cream)" }}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredRecords = RECORDS.filter((r) => {
    const matchSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = !activeGenre || r.genre === activeGenre;
    return matchSearch && matchGenre;
  });

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "catalog", label: "Каталог" },
    { key: "genres", label: "Жанры" },
    { key: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)", color: "var(--dark-brown)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--groove)", borderColor: "var(--sepia)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "var(--amber)", backgroundColor: "#111" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--amber)" }} />
            </div>
            <div>
              <div className="font-playfair font-bold text-lg leading-none" style={{ color: "var(--parchment)" }}>
                Vinyl Grove
              </div>
              <div className="font-oswald text-xs tracking-widest uppercase" style={{ color: "var(--sepia)" }}>
                Record Shop
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className="font-oswald text-sm uppercase tracking-wider px-4 py-2 transition-all duration-200 rounded"
                style={{
                  color: activeSection === item.key ? "var(--amber)" : "var(--parchment)",
                  backgroundColor: activeSection === item.key ? "rgba(201,125,26,0.12)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-oswald uppercase tracking-wide transition-all"
              style={{
                borderColor: "var(--sepia)",
                color: isPlaying ? "var(--groove)" : "var(--amber)",
                backgroundColor: isPlaying ? "var(--amber)" : "transparent",
              }}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${isPlaying ? "animate-vinyl-spin" : ""}`}
                style={{ borderColor: isPlaying ? "var(--groove)" : "var(--sepia)" }}
              >
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: isPlaying ? "var(--groove)" : "var(--sepia)" }} />
              </div>
              {isPlaying ? "Играет" : "Слушать"}
            </button>
            <button
              className="md:hidden"
              style={{ color: "var(--parchment)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{ borderColor: "var(--sepia)", backgroundColor: "var(--groove)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                className="font-oswald text-sm uppercase tracking-wider px-3 py-2 text-left rounded"
                style={{
                  color: activeSection === item.key ? "var(--amber)" : "var(--parchment)",
                  backgroundColor: activeSection === item.key ? "rgba(201,125,26,0.12)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HOME */}
      {activeSection === "home" && (
        <div>
          {/* Hero */}
          <section className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${RECORDS[1].cover})` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(26,15,7,0.93) 0%, rgba(44,26,14,0.78) 60%, rgba(92,58,30,0.45) 100%)" }}
            />

            {/* Decorative vinyl disc */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 hidden lg:block pointer-events-none">
              <div
                className="w-96 h-96 rounded-full border-8 shadow-2xl"
                style={{
                  borderColor: "#111",
                  background: "repeating-radial-gradient(circle at center, #111 0px, #1a1a1a 2px, #111 4px)",
                  animation: isPlaying ? "vinyl-spin 4s linear infinite" : "none",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
                    style={{ backgroundColor: "var(--warm-brown)", borderColor: "#111" }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-900" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center" style={{ minHeight: "85vh" }}>
              <div className="max-w-2xl">
                <p
                  className="font-oswald text-xs uppercase tracking-[0.3em] mb-4 animate-fade-in-up opacity-0"
                  style={{ color: "var(--amber)", animationDelay: "0.1s", animationFillMode: "forwards" }}
                >
                  ★ Коллекция с 1982 года ★
                </p>
                <h1
                  className="font-playfair font-black leading-none mb-6 animate-fade-in-up opacity-0"
                  style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "var(--cream)", animationDelay: "0.2s", animationFillMode: "forwards" }}
                >
                  Звук,<br />
                  <em className="italic" style={{ color: "var(--amber)" }}>который</em><br />
                  живёт
                </h1>
                <p
                  className="font-cormorant text-xl leading-relaxed mb-8 animate-fade-in-up opacity-0"
                  style={{ color: "var(--parchment)", animationDelay: "0.35s", animationFillMode: "forwards" }}
                >
                  Более 500 виниловых пластинок — от редких джазовых записей до классического рока.
                  Каждая пластинка с историей.
                </p>
                <div
                  className="flex flex-wrap gap-3 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
                >
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="font-oswald uppercase tracking-widest text-sm px-8 py-3 transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "var(--amber)", color: "var(--groove)" }}
                  >
                    Открыть каталог
                  </button>
                  <button
                    onClick={() => setActiveSection("genres")}
                    className="font-oswald uppercase tracking-widest text-sm px-8 py-3 border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: "var(--parchment)", color: "var(--parchment)", backgroundColor: "transparent" }}
                  >
                    По жанрам
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section
            className="py-6 border-y"
            style={{ backgroundColor: "var(--warm-brown)", borderColor: "var(--sepia)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3">
              {[
                { num: "500+", label: "Пластинок" },
                { num: "40+", label: "Лет истории" },
                { num: "6", label: "Жанров" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="text-center px-4"
                  style={{ borderRight: i < 2 ? "1px solid var(--sepia)" : "none" }}
                >
                  <div className="font-playfair font-bold text-3xl" style={{ color: "var(--amber)" }}>{s.num}</div>
                  <div className="font-oswald text-xs uppercase tracking-widest mt-1" style={{ color: "var(--parchment)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="ornament-line mb-10">
              <h2 className="font-playfair font-bold text-3xl text-center" style={{ color: "var(--dark-brown)", whiteSpace: "nowrap" }}>
                Новые поступления
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {RECORDS.slice(0, 3).map((r, i) => (
                <RecordCard key={r.id} record={r} delay={i * 100} />
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => setActiveSection("catalog")}
                className="font-oswald uppercase tracking-widest text-sm px-8 py-3 border-2 transition-all duration-300 hover:scale-105"
                style={{ borderColor: "var(--warm-brown)", color: "var(--warm-brown)", backgroundColor: "transparent" }}
              >
                Смотреть весь каталог
              </button>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="py-16 text-center" style={{ backgroundColor: "var(--dark-brown)" }}>
            <div className="max-w-2xl mx-auto px-6">
              <div className="font-oswald text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--sepia)" }}>
                ✦ Особое предложение ✦
              </div>
              <h2 className="font-playfair font-black text-4xl italic mb-4" style={{ color: "var(--cream)" }}>
                Оценим вашу коллекцию
              </h2>
              <p className="font-cormorant text-lg mb-8" style={{ color: "var(--parchment)" }}>
                Принимаем пластинки на комиссию и выкупаем коллекции. Честная оценка и быстрый расчёт.
              </p>
              <button
                onClick={() => setActiveSection("contacts")}
                className="font-oswald uppercase tracking-widest text-sm px-8 py-3 transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--amber)", color: "var(--groove)" }}
              >
                Связаться с нами
              </button>
            </div>
          </section>
        </div>
      )}

      {/* CATALOG */}
      {activeSection === "catalog" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10">
            <div className="ornament-line mb-4">
              <h1 className="font-playfair font-bold text-4xl text-center" style={{ color: "var(--dark-brown)", whiteSpace: "nowrap" }}>
                Каталог
              </h1>
            </div>
            <p className="font-cormorant text-lg text-center" style={{ color: "var(--warm-brown)" }}>
              {RECORDS.length} пластинок в коллекции
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--sepia)" } as React.CSSProperties}
              />
              <input
                type="text"
                placeholder="Поиск по названию или исполнителю..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border font-cormorant text-base focus:outline-none"
                style={{ backgroundColor: "var(--parchment)", borderColor: "var(--sepia)", color: "var(--dark-brown)" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveGenre(null)}
              className="font-oswald text-xs uppercase tracking-wide px-4 py-2 border transition-all"
              style={{
                borderColor: "var(--sepia)",
                backgroundColor: !activeGenre ? "var(--warm-brown)" : "transparent",
                color: !activeGenre ? "var(--cream)" : "var(--warm-brown)",
              }}
            >
              Все жанры
            </button>
            {GENRES.map((g) => (
              <button
                key={g.name}
                onClick={() => setActiveGenre(activeGenre === g.name ? null : g.name)}
                className="font-oswald text-xs uppercase tracking-wide px-4 py-2 border transition-all"
                style={{
                  borderColor: "var(--sepia)",
                  backgroundColor: activeGenre === g.name ? "var(--warm-brown)" : "transparent",
                  color: activeGenre === g.name ? "var(--cream)" : "var(--warm-brown)",
                }}
              >
                {g.icon} {g.name}
              </button>
            ))}
          </div>

          {filteredRecords.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🎵</div>
              <p className="font-cormorant text-xl" style={{ color: "var(--warm-brown)" }}>Пластинки не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecords.map((r, i) => (
                <RecordCard key={r.id} record={r} delay={i * 50} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* GENRES */}
      {activeSection === "genres" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="ornament-line mb-10">
            <h1 className="font-playfair font-bold text-4xl text-center" style={{ color: "var(--dark-brown)", whiteSpace: "nowrap" }}>
              Жанры
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENRES.map((genre, i) => (
              <button
                key={genre.name}
                onClick={() => { setActiveGenre(genre.name); setActiveSection("catalog"); }}
                className="card-hover text-left p-8 border-2 relative overflow-hidden group animate-fade-in-up opacity-0"
                style={{
                  backgroundColor: "var(--parchment)",
                  borderColor: "var(--sepia)",
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="text-4xl mb-4">{genre.icon}</div>
                <h3 className="font-playfair font-bold text-2xl mb-2" style={{ color: "var(--dark-brown)" }}>
                  {genre.name}
                </h3>
                <p className="font-oswald text-sm uppercase tracking-widest" style={{ color: "var(--sepia)" }}>
                  {genre.count} пластинок
                </p>
                <div
                  className="mt-4 flex items-center gap-2 font-oswald text-xs uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--amber)" }}
                >
                  Смотреть <Icon name="ArrowRight" size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONTACTS */}
      {activeSection === "contacts" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="ornament-line mb-10">
            <h1 className="font-playfair font-bold text-4xl text-center" style={{ color: "var(--dark-brown)", whiteSpace: "nowrap" }}>
              Контакты
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: "MapPin", title: "Адрес", text: "Москва, ул. Арбат, 24\nм. Арбатская" },
              { icon: "Phone", title: "Телефон", text: "+7 (495) 123-45-67\nПн–Вс: 11:00–21:00" },
              { icon: "Mail", title: "E-mail", text: "hello@vinylgrove.ru\nОтвечаем за 2 часа" },
              { icon: "Clock", title: "Часы работы", text: "Пн–Пт: 11:00–21:00\nСб–Вс: 12:00–20:00" },
            ].map((c) => (
              <div
                key={c.title}
                className="flex gap-4 p-6 border"
                style={{ backgroundColor: "var(--parchment)", borderColor: "var(--sepia)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--warm-brown)" }}
                >
                  <Icon name={c.icon as "MapPin"} size={18} style={{ color: "var(--amber)" } as React.CSSProperties} />
                </div>
                <div>
                  <h3 className="font-oswald uppercase tracking-wider text-sm mb-1" style={{ color: "var(--sepia)" }}>
                    {c.title}
                  </h3>
                  <p className="font-cormorant text-base whitespace-pre-line leading-relaxed" style={{ color: "var(--dark-brown)" }}>
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="p-8 border"
            style={{ backgroundColor: "var(--parchment)", borderColor: "var(--sepia)" }}
          >
            <h2 className="font-playfair font-bold text-2xl mb-6" style={{ color: "var(--dark-brown)" }}>
              Написать нам
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-oswald text-xs uppercase tracking-wide block mb-1" style={{ color: "var(--sepia)" }}>
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 border font-cormorant text-base focus:outline-none"
                  style={{ backgroundColor: "var(--cream)", borderColor: "var(--sepia)", color: "var(--dark-brown)" }}
                />
              </div>
              <div>
                <label className="font-oswald text-xs uppercase tracking-wide block mb-1" style={{ color: "var(--sepia)" }}>
                  Телефон
                </label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 border font-cormorant text-base focus:outline-none"
                  style={{ backgroundColor: "var(--cream)", borderColor: "var(--sepia)", color: "var(--dark-brown)" }}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="font-oswald text-xs uppercase tracking-wide block mb-1" style={{ color: "var(--sepia)" }}>
                Сообщение
              </label>
              <textarea
                rows={4}
                placeholder="Что вас интересует?"
                className="w-full px-4 py-3 border font-cormorant text-base focus:outline-none resize-none"
                style={{ backgroundColor: "var(--cream)", borderColor: "var(--sepia)", color: "var(--dark-brown)" }}
              />
            </div>
            <button
              className="font-oswald uppercase tracking-widest text-sm px-8 py-3 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--warm-brown)", color: "var(--cream)" }}
            >
              Отправить сообщение
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="mt-16 py-10 border-t"
        style={{ backgroundColor: "var(--groove)", borderColor: "var(--sepia)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-playfair font-bold text-xl" style={{ color: "var(--parchment)" }}>
            Vinyl Grove
          </div>
          <div className="font-cormorant text-sm text-center" style={{ color: "var(--sepia)" }}>
            © 2024 Vinyl Grove · Москва, Арбат 24
          </div>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className="font-oswald text-xs uppercase tracking-wide transition-colors hover:opacity-80"
                style={{ color: "var(--sepia)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
