const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

$("#y").textContent = new Date().getFullYear();

// =====================
// Date hint sync: показываем выбранную дату в .dateHint
// =====================
(() => {
  const el = document.getElementById("date");
  if (!el) return;
  const hint = el.parentElement.querySelector(".dateHint");
  if (!hint) return;

  const fmt = (v) => {
    if (!v) return "Дата";
    const [y,m,d] = v.split("-");
    return `${d}.${m}.${y}`; // dd.mm.yyyy
  };

  const sync = () => { hint.textContent = fmt(el.value); };
  el.addEventListener("change", sync);
  el.addEventListener("input", sync);
  sync();
})();

// =====================
// Date: force open picker on click (clean version)
// =====================
(() => {
  const el = document.getElementById("date");
  if (!el) return;

  el.addEventListener("click", () => {
    if (typeof el.showPicker === "function") {
      el.showPicker();
    }
  });
})();

// =====================
// CONFIG
// =====================
const TELEGRAM_USERNAME = "KaloyanPB"; // <-- поменяй если нужно (без @)
const PHONE_TEL = "+79057299716";
const EMAIL = "kaloyan.bahnev@gmail.com";

// =====================
// CONTACT SUBMIT -> TELEGRAM (primary) + MAILTO fallback
// =====================
window.kbSubmit = (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);

  const name = (fd.get("name") || "").toString().trim();
  const contact = (fd.get("contact") || "").toString().trim();
  const date = (fd.get("date") || "").toString().trim();
  const city = (fd.get("city") || "").toString().trim();
  const guests = (fd.get("guests") || "").toString().trim();
  const format = (fd.get("format") || "").toString().trim();
  const msg = (fd.get("msg") || "").toString().trim();

  const text =
`Private Chef Request — chefbahnev.com

Имя: ${name}
Контакт: ${contact}
Дата: ${date}
Город: ${city}
Гости: ${guests}
Формат: ${format || "-"}

Комментарий:
${msg || "-"}`;

  // Telegram deeplink (works on mobile + desktop with Telegram installed / web)
  const tgUrl = `https://t.me/${encodeURIComponent(TELEGRAM_USERNAME)}?text=${encodeURIComponent(text)}`;
  window.open(tgUrl, "_blank", "noopener");

  // Optional fallback mailto (uncomment if you want)
  // const subject = encodeURIComponent("Private Chef Request — chefbahnev.com");
  // const body = encodeURIComponent(text);
  // window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

  return false;
};

// =====================
// RU/EN i18n (простая версия)
// =====================
let lang = "ru";
const dict = {
  ru: {
    kicker: "Private Chef • Moscow • Europe",
    title: "Modern European<br/> & New Russian Cuisine",
    subtitle: "Частные ужины, VIP-мероприятия и luxury catering. Меню — под ваш стиль жизни.",
    cta: "Запросить дату",
    cta2: "Смотреть портфолио",

    nav_about: "Обо мне",
    nav_philosophy: "Философия",
    nav_services: "Услуги",
    nav_gallery: "Галерея",
    nav_contact: "Запросить дату",

    about_h: "Обо мне",
    about_p1: "Я — шеф-повар с международным опытом (Италия, Испания, Греция, Бразилия, Кипр) и 16+ лет в профессии. Последние годы — fine dining и запуск ресторанов в Москве.",
    about_p2: "Сейчас я фокусируюсь на формате Private Chef: частные ужины, семейное сопровождение, загородные мероприятия и VIP catering — на уровне без компромиссов по продукту и подаче.",

    phil_h: "Философия",
    phil1h: "Русский продукт — европейская техника",
    phil1p: "Северные ягоды, дикая рыба, сахалинские морепродукты, камчатский краб и русская дичь — в современном прочтении с точностью средиземноморской школы.",
    phil2h: "Вдохновение New Nordic",
    phil2p: "Чистые вкусы, сезонность, уважение к сырью, текстуры и деликатная ферментация — эстетика, близкая к New Nordic, но с русским характером.",
    phil3h: "Меню под ваш стиль жизни",
    phil3p: "Я создаю опыт, а не просто блюда: сценарий вечера, темп подачи, сервировка и детали. Всё — персонально.",

    srv_h: "Услуги",
    srv1h: "Private Dining",
    srv1p: "Камерные ужины дома или за городом. Индивидуальное меню, закупка, подача.",
    srv1l1: "Меню под запрос", srv1l2: "Премиальные продукты", srv1l3: "Сервис “под ключ”",
    srv2h: "Family Chef",
    srv2p: "Постоянное сопровождение семьи: рацион, закупки, процессы на кухне.",
    srv2l1: "Weekly planning", srv2l2: "Постановка кухни", srv2l3: "Учет предпочтений",
    srv3h: "VIP Events & Catering",
    srv3p: "Дни рождения, частные мероприятия, luxury catering с командой.",
    srv3l1: "Fine dining формат", srv3l2: "Загород и выезд", srv3l3: "Event-координация",

    gal_h: "Галерея",
    gal_p: "Selected works — private dining, family chef, VIP events.",
    gal_tab_all: "Все",
    gal_tab_dining: "Private Dining",
    gal_tab_events: "Events",
    gal_tab_plating: "Plating",
    gal_tab_season: "Seasonal",

    // CONTACT — Concierge (Variant A)

    con_h: "Запросить дату",
    con_p: "Оставьте детали — отвечу с концепцией меню и форматом обслуживания.",
    con_tg: "Написать в Telegram",
    con_call: "Позвонить",
    con_mail: "Email",
    con_ig: "Instagram",

    con_m1k: "Ответ",     con_m1v: "обычно 1–2 часа",
    con_m2k: "География", con_m2v: "Москва / Европа",
    con_m3k: "Формат",    con_m3v: "Private Dining • Family Chef • VIP",

    con_trust_t: "Детали",
    con_trust_1: "Конфиденциальность",
    con_trust_2: "Меню под предпочтения и ограничения",
    con_trust_3: "Команда и сервис — при необходимости",

    con_form_h: "Запрос",
    con_form_p: "Коротко заполните — дальше продолжим в Telegram.",
    con_step1: "1) Дата / город / гости",
    con_step2: "2) Формат",
    con_step3: "3) Контакт и детали",

    chip1d: "Камерный ужин с подачей",
    chip2d: "Рацион и сопровождение",
    chip3d: "Событие с командой",

    // fields
    f1: "Имя",
    f2: "Телефон или email",
    f3: "Дата / город / гости",
    f4: "Комментарий",
    f_date: "Дата",
    f_city: "Город",
    f_guests: "Гости",
    send: "Отправить запрос в Telegram",
    fine: "Отправка откроет Telegram с уже заполненным сообщением (данные не сохраняются на сайте)."
  },

  en: {
    kicker: "Private Chef • Moscow • Europe",
    title: "Modern European<br/> & New Russian Cuisine",
    subtitle: "Private dining, VIP events and luxury catering. A menu tailored to your lifestyle.",
    cta: "Request a date",
    cta2: "View portfolio",

    nav_about: "About",
    nav_philosophy: "Philosophy",
    nav_services: "Services",
    nav_gallery: "Gallery",
    nav_contact: "Request a date",

    about_h: "About",
    about_p1: "European-trained chef with international experience (Italy, Spain, Greece, Brazil, Cyprus) and 16+ years in the craft. In recent years — fine dining and restaurant openings in Moscow.",
    about_p2: "Today my focus is Private Chef service: intimate dinners, family support, countryside events and VIP catering — with uncompromising product quality and presentation.",

    phil_h: "Philosophy",
    phil1h: "Russian terroir, European technique",
    phil1p: "Northern berries, wild fish, Sakhalin seafood, Kamchatka crab and game — reinterpreted with Mediterranean precision.",
    phil2h: "New Nordic inspiration",
    phil2p: "Clean flavors, seasonality, respect for ingredients, texture and delicate fermentation — a Nordic-inspired approach with a Russian character.",
    phil3h: "Tailored to your lifestyle",
    phil3p: "I design an experience — pacing, plating, service and details — fully personal.",

    srv_h: "Services",
    srv1h: "Private Dining",
    srv1p: "Intimate dinners at home or in the countryside. Custom menu, sourcing, service.",
    srv1l1: "Custom menu", srv1l2: "Premium sourcing", srv1l3: "Turnkey service",
    srv2h: "Family Chef",
    srv2p: "Ongoing support for families: weekly planning, sourcing, kitchen setup.",
    srv2l1: "Weekly planning", srv2l2: "Kitchen setup", srv2l3: "Preferences & allergies",
    srv3h: "VIP Events & Catering",
    srv3p: "Birthdays, private events, luxury catering with a team.",
    srv3l1: "Fine dining format", srv3l2: "On-site service", srv3l3: "Event coordination",

    gal_h: "Gallery",
    gal_p: "Selected works — private dining, family chef, VIP events.",
    gal_tab_all: "All",
    gal_tab_dining: "Private Dining",
    gal_tab_events: "Events",
    gal_tab_plating: "Plating",
    gal_tab_season: "Seasonal",

    // CONTACT — Concierge (Variant A)
    con_kicker: "Reservation / Concierge",
    con_h: "Request a date",
    con_p: "Share the essentials — I’ll reply with a menu concept and service format.",
    con_tg: "Message on Telegram",
    con_call: "Call",
    con_mail: "Email",
    con_ig: "Instagram",

    con_m1k: "Reply",     con_m1v: "usually within 1–2 hours",
    con_m2k: "Location",  con_m2v: "Moscow / Europe",
    con_m3k: "Format",    con_m3v: "Private Dining • Family Chef • VIP",

    con_trust_t: "Details",
    con_trust_1: "Confidentiality (NDA on request)",
    con_trust_2: "Menu tailored to preferences & dietary needs",
    con_trust_3: "Team & service — if required",

    con_form_h: "Request",
    con_form_p: "Share the essentials — we’ll continue in Telegram.",
    con_step1: "1) Date / city / guests",
    con_step2: "2) Format",
    con_step3: "3) Contact & details",

    chip1d: "Intimate dinner with service",
    chip2d: "Weekly planning & support",
    chip3d: "Event with a team",

    // fields
    f1: "Name",
    f2: "Phone or email",
    f3: "Date / city / guests",
    f4: "Message",
    f_date: "Date",
    f_city: "City",
    f_guests: "Guests",
    send: "Send request via Telegram",
    fine: "This opens Telegram with a pre-filled message (no data stored on the website)."
  }
};

function applyLang(next) {
  lang = next;
  document.documentElement.lang = lang === "ru" ? "ru" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (dict[lang][k]) el.innerHTML = dict[lang][k];
  });
  $("#langBtn").textContent = lang === "ru" ? "EN" : "RU";
}
$("#langBtn").addEventListener("click", () => applyLang(lang === "ru" ? "en" : "ru"));
applyLang("ru");

// =====================
// Header scroll behavior (shrink-only)
// =====================
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// =====================
// Subtle reveal animations (lux)
// =====================
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const els = $$("[data-reveal]");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  els.forEach((el, i) => {
    el.style.setProperty("--d", `${Math.min(i * 70, 420)}ms`);
    io.observe(el);
  });
})();

// =====================
// Subtle parallax (3–5px)
// =====================
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const items = $$("[data-parallax]");
  if (!items.length) return;

  const onScroll = () => {
    const y = window.scrollY || 0;
    items.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.02;
      const v = Math.max(-6, Math.min(6, y * speed));
      el.style.transform = `translate3d(0, ${v}px, 0)`;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// =====================
// Gallery Filmstrip (C)
// =====================
(() => {
  const cats = $$(".galCat");
  const thumbs = $$(".galThumb");
  const mainImg = document.querySelector(".galleryMain__img");
  const mainCap = document.querySelector(".galleryMain__cap");

  if (!thumbs.length || !mainImg) return;

  // Disable browser scroll restore + force top on first load
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", () => window.scrollTo(0, 0));

  let currentCat = "dining";

  function setMain(src, cap) {
    mainImg.style.opacity = 0;

    setTimeout(() => {
      mainImg.src = src;
      if (mainCap) mainCap.textContent = cap || "";
      mainImg.style.opacity = 1;
    }, 180);
  }

  function filterByCat(key, { scroll = false } = {}) {
    currentCat = key;

    // active category button
    cats.forEach(c =>
      c.classList.toggle("is-active", c.dataset.key === key)
    );

    // show/hide thumbs
    thumbs.forEach((t, i) => {
      if (t.dataset.cat === key) {
        t.style.display = "";
        setTimeout(() => t.classList.add("is-visible"), i * 60);
      } else {
        t.classList.remove("is-visible");
        t.style.display = "none";
        t.classList.remove("is-active");
      }
    });

    // pick first visible thumb and set main
    const first = thumbs.find(t => t.dataset.cat === key);
    if (first) {
      thumbs.forEach(t => t.classList.remove("is-active"));
      first.classList.add("is-active");
      setMain(first.dataset.full, first.dataset.cap);
    }

    // scroll ONLY when user clicked a category
    if (scroll) {
      const target = document.querySelector(".galleryViewer") || document.querySelector(".galleryMain");
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top > 120) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  // category click -> filter + scroll to gallery
  cats.forEach(btn =>
    btn.addEventListener("click", () => filterByCat(btn.dataset.key, { scroll: true }))
  );

  // thumb click -> set main (no page scroll)
  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("is-active"));
      btn.classList.add("is-active");
      setMain(btn.dataset.full, btn.dataset.cap);
    });
  });

  // initial state (NO scroll)
  filterByCat("dining", { scroll: false });
})();

// Contact format tiles (Variant 3)
(() => {
  const root = document.querySelector("#contact");
  if (!root) return;

  const hidden = root.querySelector('input[name="format"]');
  const tiles = Array.from(root.querySelectorAll(".tile"));
  if (!hidden || !tiles.length) return;

  const setActive = (btn) => {
    tiles.forEach(t => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    hidden.value = btn.dataset.format || btn.textContent.trim();
  };

  tiles.forEach(btn => btn.addEventListener("click", () => setActive(btn)));

  const first = tiles.find(t => t.classList.contains("is-active")) || tiles[0];
  setActive(first);
})();
