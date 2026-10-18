"use client";

import { ArrowDownRight, ArrowUpRight, ArrowUpRight as ExternalArrow, ArrowRight, Menu, ScanLine, ShieldCheck, Sparkles, ChartNoAxesCombined, Gem } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fr" | "ar";

const copy = {
  en: {
    nav: ["Platform", "Guest experience", "For restaurants", "Our approach"],
    demo: "Request a private demo",
    eyebrow: "HOSPITALITY, REMEMBERED.",
    headline: "Make every return meaningful.",
    intro: "A considered loyalty experience for restaurants that believe exceptional hospitality is remembered.",
    explore: "Explore the experience",
    note: "Thoughtfully designed for exceptional guest relationships.",
    kicker: "THE EXPERIENCE",
    sectionTitle: "A quieter kind of loyalty.",
    sectionText: "More than points. A considered way to recognize guests, create meaningful privileges, and understand the relationships that bring them back.",
    steps: [
      ["01", "Welcome with intention", "One simple QR entry point opens a restaurant-branded guest experience."],
      ["02", "Recognize every return", "Configurable points and privileges make loyalty feel personal, not transactional."],
      ["03", "Understand what matters", "A clear restaurant dashboard turns guest activity into useful insight."]
    ],
    platform: "A thoughtful experience. One connected platform.",
    guest: "For your guests",
    restaurant: "For your team",
    privacy: "Designed with privacy in mind",
    privacyText: "Clear permissions, considered data collection, and guest preferences built into the experience.",
    finalTitle: "Make your hospitality memorable.",
    finalText: "See how SEREIN could fit the way your restaurant welcomes its guests.",
    footer: "A considered loyalty experience for exceptional hospitality.",
    links: ["Guest preview", "Restaurant dashboard", "SEREIN administration"],
    view: "Open preview"
  },
  fr: {
    nav: ["Plateforme", "Expérience client", "Pour les restaurants", "Notre approche"],
    demo: "Demander une démo privée",
    eyebrow: "L’HOSPITALITÉ, EN MÉMOIRE.",
    headline: "Chaque retour mérite une expérience mémorable.",
    intro: "Une expérience de fidélité raffinée, pensée pour les restaurants qui cultivent des relations durables avec leurs convives.",
    explore: "Découvrir l’expérience",
    note: "Des relations clients conçues avec attention.",
    kicker: "L’EXPÉRIENCE",
    sectionTitle: "Une autre idée de la fidélité.",
    sectionText: "Plus que des points : une manière réfléchie de reconnaître les convives, de créer des privilèges et de comprendre ce qui les incite à revenir.",
    steps: [
      ["01", "Accueillir avec attention", "Un QR code ouvre une expérience aux couleurs du restaurant."],
      ["02", "Reconnaître chaque retour", "Points et privilèges configurables rendent la fidélité plus personnelle."],
      ["03", "Comprendre les habitudes", "Un tableau de bord clair transforme l’activité en informations utiles."]
    ],
    platform: "Une expérience soignée. Une plateforme connectée.",
    guest: "Pour vos convives",
    restaurant: "Pour vos équipes",
    privacy: "La confidentialité au cœur de l’expérience",
    privacyText: "Des autorisations claires, des données limitées au nécessaire et le respect des préférences des convives.",
    finalTitle: "Faites de chaque visite un souvenir.",
    finalText: "Découvrez comment SEREIN peut accompagner l’accueil de vos convives.",
    footer: "Une expérience de fidélité pensée pour l’hospitalité d’exception.",
    links: ["Aperçu convive", "Espace restaurant", "Administration SEREIN"],
    view: "Voir l’aperçu"
  },
  ar: {
    nav: ["المنصة", "تجربة الضيف", "للمطاعم", "منهجيتنا"],
    demo: "اطلب عرضًا تجريبيًا",
    eyebrow: "ضيافة تبقى في الذاكرة",
    headline: "اجعل كل عودة تجربة تستحق التكرار.",
    intro: "منصة ولاء راقية للمطاعم التي ترى في كل زيارة فرصة لبناء علاقة مستمرة مع ضيوفها.",
    explore: "اكتشف التجربة",
    note: "تصميم مدروس لبناء علاقات مميزة مع الضيوف.",
    kicker: "التجربة",
    sectionTitle: "ولاء بمعنى أعمق.",
    sectionText: "أكثر من مجرد نقاط: طريقة مدروسة للتعرف على الضيوف، وتقديم امتيازات ذات قيمة، وفهم ما يشجعهم على العودة.",
    steps: [
      ["01", "استقبال يليق بالضيف", "يفتح رمز QR تجربة رقمية تحمل هوية المطعم."],
      ["02", "تقدير كل عودة", "تجعل النقاط والامتيازات القابلة للتخصيص الولاء أكثر شخصية."],
      ["03", "فهم ما يهم فعلًا", "تحول لوحة المطعم نشاط الضيوف إلى مؤشرات مفيدة."]
    ],
    platform: "تجربة مدروسة. منصة مترابطة.",
    guest: "لضيوفك",
    restaurant: "لفريقك",
    privacy: "الخصوصية جزء من التصميم",
    privacyText: "صلاحيات واضحة، وجمع محدود للبيانات، واحترام تفضيلات الضيوف.",
    finalTitle: "اجعل ضيافتك تجربة لا تُنسى.",
    finalText: "اكتشف كيف يمكن لـ SEREIN أن ينسجم مع طريقة استقبال مطعمك لضيوفه.",
    footer: "تجربة ولاء مصممة للضيافة الاستثنائية.",
    links: ["معاينة الضيف", "لوحة المطعم", "إدارة SEREIN"],
    view: "عرض المعاينة"
  }
};

function switchLocale(locale: Locale) {
  const parts = window.location.pathname.split("/");
  parts[1] = locale;
  window.location.href = parts.join("/") || "/en";
}

export default function MarketingPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const rtl = locale === "ar";
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = rtl ? "rtl" : "ltr"; }, [locale, rtl]);

  return (
    <main className={rtl ? "marketing rtl" : "marketing"} dir={rtl ? "rtl" : "ltr"} lang={locale}>
      <header className="site-header wrap">
        <a className="wordmark" href={`/${locale}`} aria-label="SEREIN home">
          <span className="brand-mark">S</span><span>SEREIN</span>
        </a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#platform">{t.nav[0]}</a>
          <a href="#experience">{t.nav[1]}</a>
          <a href="#restaurants">{t.nav[2]}</a>
          <a href="#approach">{t.nav[3]}</a>
        </nav>
        <div className="header-actions">
          <select aria-label="Language" value={locale} onChange={(e) => switchLocale(e.target.value as Locale)} className="language-select">
            <option value="en">EN</option><option value="fr">FR</option><option value="ar">AR</option>
          </select>
          <a className="button button-brass button-small desktop-cta" href="#contact">{t.demo}<ArrowUpRight size={15} /></a>
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20} /></button>
        </div>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p>
          <h1>{t.headline}</h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button button-brass" href="#contact">{t.demo}<ArrowUpRight size={17} /></a>
            <a className="text-link" href="#experience">{t.explore}<ArrowDownRight size={16} /></a>
          </div>
          <p className="hero-note"><span className="tiny-star">✳</span>{t.note}</p>
        </div>
        <div className="hero-visual">
          <div className="hero-photo" role="img" aria-label="Elegant restaurant interior at dusk" />
          <div className="photo-caption"><span>AN EXPERIENCE, CONSIDERED</span><span>01 / 03</span></div>
          <div className="membership-card">
            <div className="membership-top"><span className="mini-emblem">S</span><span className="micro-label">PRIVATE MEMBERSHIP</span><ArrowUpRight size={16} /></div>
            <p className="membership-name">Serein Privé</p>
            <div className="membership-balance"><strong>1,240</strong><span>POINTS</span></div>
            <div className="progress-track"><span /></div>
            <div className="membership-bottom"><span>Next privilege</span><span>68%</span></div>
          </div>
          <div className="floating-note"><span className="note-icon"><Sparkles size={15} /></span><span><strong>Thoughtful by design</strong><small>Every guest relationship matters.</small></span></div>
        </div>
      </section>

      <section className="intro-strip wrap" id="platform">
        <p className="eyebrow">{t.kicker}</p>
        <h2>{t.sectionTitle}</h2>
        <p className="section-lead">{t.sectionText}</p>
      </section>

      <section className="feature-grid wrap" id="experience">
        {t.steps.map((step, index) => {
          const Icon = [ScanLine, Gem, ChartNoAxesCombined][index];
          return <article className="feature-card" key={step[0]}>
            <div className="feature-top"><span>{step[0]}</span><Icon size={21} strokeWidth={1.35} /></div>
            <h3>{step[1]}</h3><p>{step[2]}</p>
            <span className="feature-rule" />
          </article>;
        })}
      </section>

      <section className="product-section wrap" id="restaurants">
        <div className="product-copy">
          <p className="eyebrow">{t.platform}</p>
          <h2>{t.guest}<br /><em>&</em> {t.restaurant}</h2>
          <p className="section-lead">{t.sectionText}</p>
          <div className="product-links">
            <a href={`/${locale}/guest`}>{t.links[0]} <ArrowRight size={16} /></a>
            <a href={`/${locale}/restaurant`}>{t.links[1]} <ArrowRight size={16} /></a>
            <a href={`/${locale}/platform`}>{t.links[2]} <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="dashboard-preview">
          <div className="preview-header"><div><span className="preview-dot" /> <span>OVERVIEW</span></div><span>DEMO VIEW</span></div>
          <div className="preview-title">Guest relationships <span>↗</span></div>
          <div className="preview-metrics"><div><small>Returning guests</small><strong>68.2%</strong><span>Illustrative demo data</span></div><div><small>Active members</small><strong>1,284</strong><span>Sample workspace</span></div></div>
          <div className="chart-title">Guest activity <span>Last 7 days</span></div>
          <div className="chart-bars">{[38,58,45,74,52,87,65,95,61,77,49,82,68,90].map((h,i)=><span key={i} style={{height:`${h}%`}} />)}</div>
          <div className="preview-foot"><ShieldCheck size={15} /> {t.privacy}<span className="preview-disclaimer">Illustrative data · No live account connected</span></div>
        </div>
      </section>

      <section className="privacy-section wrap" id="approach">
        <div className="privacy-symbol"><ShieldCheck size={25} strokeWidth={1.25} /></div>
        <div><p className="eyebrow">OUR APPROACH</p><h2>{t.privacy}</h2><p>{t.privacyText}</p></div>
      </section>

      <section className="contact-section wrap" id="contact">
        <div><p className="eyebrow">A PRIVATE INTRODUCTION</p><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div>
        <a className="button button-brass" href="mailto:hello@serein.example?subject=SEREIN%20private%20demo">{t.demo}<ExternalArrow size={16} /></a>
      </section>

      <footer className="site-footer wrap">
        <a className="wordmark" href={`/${locale}`}><span className="brand-mark">S</span><span>SEREIN</span></a>
        <p>{t.footer}</p>
        <div className="footer-links"><a href={`/${locale}/guest`}>Guest</a><a href={`/${locale}/restaurant`}>Restaurants</a><a href={`/${locale}/platform`}>Platform admin</a></div>
        <span className="copyright">© 2026 SEREIN · CONCEPT PREVIEW</span>
      </footer>
    </main>
  );
}