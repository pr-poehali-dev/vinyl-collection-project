import { useState } from "react";
import Icon from "@/components/ui/icon";

const GENRES = [
  { name: "Рок", icon: "🎸", records: [] },
  { name: "Классика", icon: "🎻", records: [] },
  { name: "Поп", icon: "🎶", records: [] },
  { name: "Серии", icon: "🗂️", records: ["Музыкальный телетайп 2"] },
  { name: "Сборники", icon: "📀", records: [] },
];

type Section = "home" | "catalog" | "genres" | "contacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(26,15,7,1) 0%, rgba(44,26,14,0.95) 60%, rgba(92,58,30,0.85) 100%)" }}
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
          <div className="ornament-line mb-10">
            <h1 className="font-playfair font-bold text-4xl text-center" style={{ color: "var(--dark-brown)", whiteSpace: "nowrap" }}>
              Каталог
            </h1>
          </div>
          <p className="font-cormorant text-lg text-center" style={{ color: "var(--warm-brown)" }}>
            Свяжитесь с нами, чтобы узнать о наличии пластинок
          </p>
          <div className="text-center mt-8">
            <button
              onClick={() => setActiveSection("contacts")}
              className="font-oswald uppercase tracking-widest text-sm px-8 py-3 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--warm-brown)", color: "var(--cream)" }}
            >
              Связаться с нами
            </button>
          </div>
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
              <div
                key={genre.name}
                className="card-hover text-left p-8 border-2 animate-fade-in-up opacity-0"
                style={{
                  backgroundColor: "var(--parchment)",
                  borderColor: "var(--sepia)",
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="text-4xl mb-4">{genre.icon}</div>
                <h3 className="font-playfair font-bold text-2xl mb-3" style={{ color: "var(--dark-brown)" }}>
                  {genre.name}
                </h3>
                {genre.records.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {genre.records.map((r) => (
                      <li key={r} className="font-cormorant text-base flex items-center gap-2" style={{ color: "var(--warm-brown)" }}>
                        <span style={{ color: "var(--sepia)" }}>—</span> {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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