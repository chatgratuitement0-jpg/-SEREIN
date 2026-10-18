"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, Bell, CalendarDays, Check, ChevronDown, CircleHelp, CreditCard, Download, Gift, Gem, Globe2, LayoutDashboard, LogOut, MoreHorizontal, Plus, Search, Settings, ShieldCheck, Sparkles, Users, Utensils, Wallet, QrCode, TrendingUp, Building2, Activity, SlidersHorizontal, Menu, X } from "lucide-react";

type Locale = "en" | "fr" | "ar";
type Portal = "guest" | "restaurant" | "platform";

const words = {
  en: {
    guest:"Guest membership", restaurant:"Restaurant studio", platform:"SEREIN console",
    overview:"Overview", members:"Guests & members", rewards:"Rewards", campaigns:"Campaigns", insights:"Insights", settings:"Settings", activity:"Activity",
    venues:"Restaurants", subscriptions:"Subscriptions", team:"Team & access", audit:"Activity log",
    hello:"Good morning", welcome:"A considered view of your guest relationships.", memberWelcome:"Welcome back, Amira.",
    points:"Available points", tier:"Membership level", visits:"Visits this year", next:"Next privilege",
    activeMembers:"Active members", repeatRate:"Returning guests", redemptions:"Rewards redeemed", campaign:"Campaign engagement",
    guests:"Guest relationships", search:"Search guests...", name:"Guest", visitsLabel:"Visits", pointsLabel:"Points", lastVisit:"Last visit", status:"Status",
    active:"Active", invited:"Invited", vip:"Serein Privé", regular:"Member", recent:"Recent activity", earn:"Points earned", redeem:"Reward redeemed",
    rewardTitle:"Privileges, thoughtfully chosen", rewardDesc:"Experiences selected by your restaurant.", unlock:"Unlock with points", use:"Preview redemption",
    campaignTitle:"A more personal welcome", campaignDesc:"Build considered campaigns for the guests you want to reach.", create:"Create campaign",
    settingsTitle:"Your restaurant, your identity", settingsDesc:"Manage your brand details, loyalty rules, and team access.",
    venueTitle:"Restaurant portfolio", venueDesc:"Manage venue access and review the platform at a glance.",
    totalVenues:"Restaurants", monthlyRevenue:"Monthly recurring revenue", trial:"Trial venues", support:"Open support cases",
    plan:"Plan", mrr:"Monthly", statusLabel:"Status", activePlan:"Active", trialPlan:"Trial", view:"View details",
    demo:"Demo workspace", demoNote:"Illustrative data only — no live accounts are connected.",
    openSite:"Marketing site", guestPortal:"Guest portal", restaurantPortal:"Restaurant dashboard", platformPortal:"Company admin",
    newGuest:"Invite a guest", export:"Export report", saved:"Saved in this demo", done:"Done", cancel:"Cancel",
    language:"Language", notifications:"Notifications", help:"Help centre", signout:"Sign out",
    addReward:"Add reward", editRules:"Edit loyalty rules", manageTeam:"Manage team", newVenue:"Add restaurant",
    overviewText:"Your hospitality, in perspective", memberSince:"Member since 2025", pointsHistory:"Points activity",
    visit:"Restaurant visit", birthday:"Birthday privilege", tasting:"Chef’s tasting experience",
    goal:"Points to next privilege", sample:"Sample interface", noBackend:"This is a front-end demo. Changes are not saved to a database.",
    filter:"Filter", all:"All guests", action:"Actions", viewAll:"View all", monthly:"This month", last7:"Last 7 days",
    secure:"Privacy-conscious by design", signIn:"Sign in", demoBadge:"Preview"
  },
  fr: {
    guest:"Espace convive", restaurant:"Espace restaurant", platform:"Console SEREIN",
    overview:"Vue d’ensemble", members:"Convives & membres", rewards:"Privilèges", campaigns:"Campagnes", insights:"Analyses", settings:"Paramètres", activity:"Activité",
    venues:"Restaurants", subscriptions:"Abonnements", team:"Équipe & accès", audit:"Journal d’activité",
    hello:"Bonjour", welcome:"Une vision claire de vos relations avec vos convives.", memberWelcome:"Bienvenue, Amira.",
    points:"Points disponibles", tier:"Niveau de membre", visits:"Visites cette année", next:"Prochain privilège",
    activeMembers:"Membres actifs", repeatRate:"Convives de retour", redemptions:"Privilèges utilisés", campaign:"Engagement des campagnes",
    guests:"Relations convives", search:"Rechercher un convive...", name:"Convive", visitsLabel:"Visites", pointsLabel:"Points", lastVisit:"Dernière visite", status:"Statut",
    active:"Actif", invited:"Invité", vip:"Serein Privé", regular:"Membre", recent:"Activité récente", earn:"Points gagnés", redeem:"Privilège utilisé",
    rewardTitle:"Des privilèges choisis avec soin", rewardDesc:"Des expériences sélectionnées par votre restaurant.", unlock:"Débloquer avec des points", use:"Aperçu de l’utilisation",
    campaignTitle:"Un accueil plus personnel", campaignDesc:"Créez des campagnes adaptées aux convives que vous souhaitez retrouver.", create:"Créer une campagne",
    settingsTitle:"Votre restaurant, votre identité", settingsDesc:"Gérez votre marque, les règles de fidélité et les accès de votre équipe.",
    venueTitle:"Portefeuille de restaurants", venueDesc:"Gérez les accès et consultez la plateforme en un coup d’œil.",
    totalVenues:"Restaurants", monthlyRevenue:"Revenu mensuel récurrent", trial:"Restaurants en essai", support:"Demandes ouvertes",
    plan:"Offre", mrr:"Mensuel", statusLabel:"Statut", activePlan:"Actif", trialPlan:"Essai", view:"Voir les détails",
    demo:"Espace de démonstration", demoNote:"Données illustratives — aucun compte réel n’est connecté.",
    openSite:"Site vitrine", guestPortal:"Espace convive", restaurantPortal:"Tableau de bord", platformPortal:"Administration",
    newGuest:"Inviter un convive", export:"Exporter le rapport", saved:"Enregistré dans cette démo", done:"Terminé", cancel:"Annuler",
    language:"Langue", notifications:"Notifications", help:"Centre d’aide", signout:"Déconnexion",
    addReward:"Ajouter un privilège", editRules:"Modifier les règles", manageTeam:"Gérer l’équipe", newVenue:"Ajouter un restaurant",
    overviewText:"Votre hospitalité, en perspective", memberSince:"Membre depuis 2025", pointsHistory:"Activité des points",
    visit:"Visite au restaurant", birthday:"Privilège anniversaire", tasting:"Expérience de dégustation",
    goal:"Points avant le prochain privilège", sample:"Interface de démonstration", noBackend:"Cette interface est une démo. Les modifications ne sont pas enregistrées en base.",
    filter:"Filtrer", all:"Tous les convives", action:"Actions", viewAll:"Tout voir", monthly:"Ce mois-ci", last7:"7 derniers jours",
    secure:"La confidentialité dès la conception", signIn:"Connexion", demoBadge:"Aperçu"
  },
  ar: {
    guest:"عضوية الضيف", restaurant:"مساحة المطعم", platform:"لوحة SEREIN",
    overview:"نظرة عامة", members:"الضيوف والأعضاء", rewards:"المكافآت", campaigns:"الحملات", insights:"التحليلات", settings:"الإعدادات", activity:"النشاط",
    venues:"المطاعم", subscriptions:"الاشتراكات", team:"الفريق والصلاحيات", audit:"سجل النشاط",
    hello:"صباح الخير", welcome:"نظرة مدروسة على علاقتك بضيوف المطعم.", memberWelcome:"مرحبًا بك، أميرة.",
    points:"النقاط المتاحة", tier:"مستوى العضوية", visits:"زيارات هذا العام", next:"الامتياز التالي",
    activeMembers:"الأعضاء النشطون", repeatRate:"الضيوف العائدون", redemptions:"المكافآت المستبدلة", campaign:"تفاعل الحملات",
    guests:"علاقات الضيوف", search:"ابحث عن ضيف...", name:"الضيف", visitsLabel:"الزيارات", pointsLabel:"النقاط", lastVisit:"آخر زيارة", status:"الحالة",
    active:"نشط", invited:"مدعو", vip:"Serein Privé", regular:"عضو", recent:"النشاط الأخير", earn:"نقاط مكتسبة", redeem:"مكافأة مستبدلة",
    rewardTitle:"امتيازات مختارة بعناية", rewardDesc:"تجارب يختارها مطعمك لضيوفه.", unlock:"استبدال النقاط", use:"معاينة الاستبدال",
    campaignTitle:"ترحيب أكثر خصوصية", campaignDesc:"أنشئ حملات مدروسة للضيوف الذين تريد التواصل معهم.", create:"إنشاء حملة",
    settingsTitle:"مطعمك، هويتك", settingsDesc:"أدر هوية المطعم وقواعد الولاء وصلاحيات الفريق.",
    venueTitle:"محفظة المطاعم", venueDesc:"أدر وصول المطاعم وراجع أداء المنصة من مكان واحد.",
    totalVenues:"المطاعم", monthlyRevenue:"الإيراد الشهري المتكرر", trial:"مطاعم تجريبية", support:"طلبات الدعم المفتوحة",
    plan:"الخطة", mrr:"شهريًا", statusLabel:"الحالة", activePlan:"نشط", trialPlan:"تجريبي", view:"عرض التفاصيل",
    demo:"مساحة تجريبية", demoNote:"بيانات توضيحية فقط — لا توجد حسابات حقيقية متصلة.",
    openSite:"الموقع التسويقي", guestPortal:"واجهة الضيف", restaurantPortal:"لوحة المطعم", platformPortal:"إدارة الشركة",
    newGuest:"دعوة ضيف", export:"تصدير التقرير", saved:"تم الحفظ في هذه المعاينة", done:"تم", cancel:"إلغاء",
    language:"اللغة", notifications:"الإشعارات", help:"مركز المساعدة", signout:"تسجيل الخروج",
    addReward:"إضافة مكافأة", editRules:"تعديل قواعد الولاء", manageTeam:"إدارة الفريق", newVenue:"إضافة مطعم",
    overviewText:"صورة أوضح عن تجربة الضيافة", memberSince:"عضو منذ 2025", pointsHistory:"حركة النقاط",
    visit:"زيارة المطعم", birthday:"امتياز عيد الميلاد", tasting:"تجربة تذوق من الشيف",
    goal:"نقطة للوصول إلى الامتياز التالي", sample:"واجهة تجريبية", noBackend:"هذه واجهة تجريبية؛ التغييرات لا تُحفظ في قاعدة بيانات.",
    filter:"تصفية", all:"جميع الضيوف", action:"الإجراءات", viewAll:"عرض الكل", monthly:"هذا الشهر", last7:"آخر 7 أيام",
    secure:"الخصوصية جزء من التصميم", signIn:"تسجيل الدخول", demoBadge:"معاينة"
  }
};

const guestRows = [
  { name: "Amira Benali", email: "amira.b@example.com", visits: 12, points: "1,240", last: "12 Oct", status: "vip" },
  { name: "Youssef Idrissi", email: "y.idrissi@example.com", visits: 8, points: "860", last: "10 Oct", status: "active" },
  { name: "Salma Alaoui", email: "salma.a@example.com", visits: 5, points: "420", last: "08 Oct", status: "active" },
  { name: "Adam Laurent", email: "adam.l@example.com", visits: 3, points: "210", last: "02 Oct", status: "invited" }
];

function switchLocale(locale: Locale) {
  const parts = window.location.pathname.split("/");
  parts[1] = locale;
  window.location.href = parts.join("/");
}

export default function SereinApp({ locale, portal }: { locale: Locale; portal: Portal }) {
  const t = words[locale];
  const rtl = locale === "ar";
  useEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = rtl ? "rtl" : "ltr"; }, [locale, rtl]);
  const [active, setActive] = useState("overview");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const navItems = portal === "guest"
    ? [{ id: "overview", label: t.overview, icon: LayoutDashboard }, { id: "rewards", label: t.rewards, icon: Gift }, { id: "activity", label: t.pointsHistory, icon: Activity }, { id: "settings", label: t.settings, icon: Settings }]
    : portal === "restaurant"
      ? [{ id: "overview", label: t.overview, icon: LayoutDashboard }, { id: "members", label: t.members, icon: Users }, { id: "rewards", label: t.rewards, icon: Gift }, { id: "campaigns", label: t.campaigns, icon: Sparkles }, { id: "insights", label: t.insights, icon: TrendingUp }, { id: "settings", label: t.settings, icon: Settings }]
      : [{ id: "overview", label: t.overview, icon: LayoutDashboard }, { id: "venues", label: t.venues, icon: Building2 }, { id: "subscriptions", label: t.subscriptions, icon: CreditCard }, { id: "team", label: t.team, icon: Users }, { id: "audit", label: t.audit, icon: ShieldCheck }, { id: "settings", label: t.settings, icon: Settings }];

  const filteredGuests = useMemo(() => guestRows.filter((g) => (g.name + g.email).toLowerCase().includes(query.toLowerCase())), [query]);
  const portalTitle = portal === "guest" ? t.guest : portal === "restaurant" ? t.restaurant : t.platform;
  const title = active === "members" ? t.guests : active === "rewards" ? t.rewards : active === "campaigns" ? t.campaigns : active === "insights" ? t.insights : active === "venues" ? t.venues : active === "subscriptions" ? t.subscriptions : active === "team" ? t.team : active === "audit" ? t.audit : active === "settings" ? t.settings : t.overview;

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  const isGuest = portal === "guest";
  const isPlatform = portal === "platform";

  return (
    <main className={rtl ? "app-frame rtl" : "app-frame"} dir={rtl ? "rtl" : "ltr"} lang={locale}>
      <aside className={mobileOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-brand"><a href={`/${locale}`} className="wordmark"><span className="brand-mark">S</span><span>SEREIN</span></a><button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
        <div className="workspace-label">{portal === "guest" ? "MEMBERSHIP" : portal === "restaurant" ? "RESTAURANT WORKSPACE" : "COMPANY WORKSPACE"}</div>
        <div className="workspace-switch"><span className="workspace-icon">{portal === "guest" ? <GemIcon /> : portal === "restaurant" ? <Utensils size={17} /> : <Building2 size={17} />}</span><span><strong>{portal === "guest" ? "Serein Privé" : portal === "restaurant" ? "Maison Aurore" : "SEREIN HQ"}</strong><small>{portal === "guest" ? "Private member" : portal === "restaurant" ? "Growth plan · Demo" : "Platform owner"}</small></span><ChevronDown size={15} /></div>
        <nav className="side-nav" aria-label="Main navigation">
          <span className="nav-caption">{portal === "guest" ? "YOUR MEMBERSHIP" : "WORKSPACE"}</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={active === item.id ? "side-link active" : "side-link"} onClick={() => { setActive(item.id); setMobileOpen(false); }}><Icon size={17} strokeWidth={1.65} /><span>{item.label}</span>{item.id === "campaigns" && <span className="nav-count">2</span>}</button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="privacy-chip"><ShieldCheck size={15} /><span>{t.secure}</span></div>
          <a className="side-link" href={`/${locale}`}><ArrowLeft size={16} /><span>{t.openSite}</span></a>
          <div className="profile-mini"><div className="avatar">{isPlatform ? "S" : isGuest ? "A" : "MA"}</div><span><strong>{isPlatform ? "SEREIN Admin" : isGuest ? "Amira Benali" : "Maya A."}</strong><small>{isPlatform ? "Owner" : isGuest ? "Privé member" : "Restaurant owner"}</small></span><MoreHorizontal size={17} /></div>
        </div>
      </aside>

      <section className="app-main">
        <header className="app-topbar">
          <div className="topbar-left"><button className="icon-button mobile-menu dashboard-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><Menu size={19} /></button><div className="breadcrumb"><span>{portalTitle}</span><ArrowRight size={13} /><strong>{title}</strong></div></div>
          <div className="topbar-actions">
            <span className="demo-badge"><span />{t.demoBadge}</span>
            <select className="language-select" aria-label={t.language} value={locale} onChange={(e) => switchLocale(e.target.value as Locale)}><option value="en">EN</option><option value="fr">FR</option><option value="ar">AR</option></select>
            <button className="icon-button notification-button" onClick={() => notify(t.notifications)} aria-label={t.notifications}><Bell size={17} /><i /></button>
            <button className="icon-button" onClick={() => notify(t.help)} aria-label={t.help}><CircleHelp size={17} /></button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><p className="eyebrow">{portal === "guest" ? "SEREIN PRIVÉ" : portal === "restaurant" ? "MAISON AURORE / SEREIN" : "SEREIN / COMPANY"}</p><h1>{isGuest ? t.memberWelcome : active === "overview" ? t.hello + (isPlatform ? ", SEREIN." : ", Maya.") : title}</h1><p>{active === "overview" ? (isGuest ? t.overviewText : t.welcome) : t.noBackend}</p></div>
            <div className="heading-actions">{portal === "restaurant" && <button className="button button-outline button-small" onClick={() => notify(t.saved)}><Download size={15} />{t.export}</button>}{portal !== "guest" && <button className="button button-brass button-small" onClick={() => notify(portal === "platform" ? t.newVenue : t.newGuest)}><Plus size={16} />{portal === "platform" ? t.newVenue : t.newGuest}</button>}</div>
          </div>

          {isGuest ? (
            <>
              <section className="guest-hero-card">
                <div className="guest-card-copy"><span className="micro-label">SEREIN PRIVÉ · MEMBER SINCE 2025</span><h2>Your next experience awaits.</h2><p>Good hospitality stays with you. Your membership opens the door to thoughtful privileges at Maison Aurore.</p><a href="#guest-rewards" className="text-link">{t.rewardTitle}<ArrowDownRight size={16} /></a></div>
                <div className="guest-card-points"><span className="micro-label">{t.points}</span><strong>1,240</strong><span>POINTS</span><div className="progress-track"><span /></div><small>260 points to your next privilege</small></div>
                <div className="guest-card-watermark">S</div>
              </section>
              <div className="metric-grid three">
                <Metric icon={<Gem size={18} />} label={t.tier} value="Serein Privé" note={t.memberSince} />
                <Metric icon={<CalendarDays size={18} />} label={t.visits} value="12" note="+3 since last year" />
                <Metric icon={<Gift size={18} />} label={t.next} value="Chef’s table" note="1,500 points" />
              </div>
              <section className="content-panel" id="guest-rewards"><PanelHeading title={t.rewardTitle} subtitle={t.rewardDesc} action={t.viewAll} onAction={() => setActive("rewards")} /><div className="reward-grid"><Reward title={t.tasting} points="1,500" icon="✳" onSelect={() => { setSelectedReward(t.tasting); notify(t.use); }} /><Reward title={t.birthday} points="800" icon="◇" onSelect={() => { setSelectedReward(t.birthday); notify(t.use); }} /><Reward title="Priority reservation" points="600" icon="⌁" onSelect={() => { setSelectedReward("Priority reservation"); notify(t.use); }} /></div>{selectedReward && <p className="inline-notice"><Check size={15} /> {selectedReward} — {t.noBackend}</p>}</section>
              <section className="content-panel"><PanelHeading title={t.pointsHistory} subtitle={t.recent} action={t.viewAll} onAction={() => setActive("activity")} /><ActivityRow icon={<ArrowDownLeft size={17} />} title={t.visit} detail="Maison Aurore · 12 Oct" value="+120 pts" /><ActivityRow icon={<Gift size={17} />} title={t.birthday} detail="Maison Aurore · 04 Oct" value="Redeemed" /><ActivityRow icon={<ArrowDownLeft size={17} />} title={t.visit} detail="Maison Aurore · 28 Sep" value="+90 pts" /></section>
            </>
          ) : isPlatform ? (
            <>
              <div className="metric-grid four"><Metric icon={<Building2 size={18} />} label={t.totalVenues} value="18" note="+3 this month" /><Metric icon={<Wallet size={18} />} label={t.monthlyRevenue} value="—" note="Billing not connected" /><Metric icon={<Sparkles size={18} />} label={t.trial} value="4" note="Illustrative demo data" /><Metric icon={<CircleHelp size={18} />} label={t.support} value="2" note="Sample support queue" /></div>
              {active === "overview" || active === "venues" ? <section className="content-panel"><PanelHeading title={t.venueTitle} subtitle={t.venueDesc} action={t.filter} onAction={() => notify(t.filter)} /><div className="table-toolbar"><div className="search-field"><Search size={16} /><input placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} /></div><button className="button button-outline button-small" onClick={() => notify(t.export)}><Download size={15} />{t.export}</button></div><div className="table-wrap"><table><thead><tr><th>{t.name}</th><th>{t.plan}</th><th>{t.mrr}</th><th>{t.statusLabel}</th><th /></tr></thead><tbody>{[["Maison Aurore","Growth","299 DH",t.activePlan],["Atelier Olive","Essential","149 DH",t.activePlan],["Dar Noura","Signature","599 DH",t.trialPlan],["Le Jardin Secret","Growth","299 DH",t.activePlan]].map((row) => <tr key={row[0]}><td><div className="table-name"><span className="venue-avatar">{row[0].slice(0,1)}</span><span><strong>{row[0]}</strong><small>Morocco · Restaurant</small></span></div></td><td>{row[1]}</td><td>{row[2]}</td><td><span className={row[3] === t.activePlan ? "status-pill success" : "status-pill pending"}>{row[3]}</span></td><td><button className="icon-button" onClick={() => notify(t.view)} aria-label={t.view}><ArrowRight size={16} /></button></td></tr>)}</tbody></table></div></section> : <section className="content-panel"><PanelHeading title={title} subtitle={t.noBackend} /><div className="empty-state"><Settings size={26} /><h3>{title}</h3><p>{t.sample}. {t.noBackend}</p><button className="button button-outline" onClick={() => notify(t.saved)}>{t.view}</button></div></section>}
              <section className="content-panel"><PanelHeading title={t.audit} subtitle={t.recent} action={t.viewAll} onAction={() => setActive("audit")} /><ActivityRow icon={<Building2 size={17} />} title="Maison Aurore" detail="Restaurant workspace created · 12 Oct" value="Created" /><ActivityRow icon={<CreditCard size={17} />} title="Atelier Olive" detail="Plan changed · 10 Oct" value="Updated" /><ActivityRow icon={<Users size={17} />} title="Team access" detail="Role review · 08 Oct" value="Reviewed" /></section>
            </>
          ) : (
            <>
              <div className="metric-grid four"><Metric icon={<Users size={18} />} label={t.activeMembers} value="1,284" note="+8.4% vs previous month" /><Metric icon={<TrendingUp size={18} />} label={t.repeatRate} value="—" note="Connect guest activity to calculate" /><Metric icon={<Gift size={18} />} label={t.redemptions} value="86" note="Illustrative demo data" /><Metric icon={<Sparkles size={18} />} label={t.campaign} value="—" note="Campaign tracking not connected" /></div>
              {active === "overview" || active === "members" ? <section className="content-panel"><PanelHeading title={t.guests} subtitle={t.welcome} action={t.viewAll} onAction={() => setActive("members")} /><div className="table-toolbar"><div className="search-field"><Search size={16} /><input placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="toolbar-actions"><button className="button button-outline button-small" onClick={() => notify(t.filter)}><SlidersHorizontal size={15} />{t.filter}</button><button className="button button-brass button-small" onClick={() => notify(t.newGuest)}><Plus size={15} />{t.newGuest}</button></div></div><div className="table-wrap"><table><thead><tr><th>{t.name}</th><th>{t.visitsLabel}</th><th>{t.pointsLabel}</th><th>{t.lastVisit}</th><th>{t.status}</th><th /></tr></thead><tbody>{filteredGuests.map((g) => <tr key={g.email}><td><div className="table-name"><span className="avatar">{g.name.split(" ").map(s => s[0]).join("").slice(0,2)}</span><span><strong>{g.name}</strong><small>{g.email}</small></span></div></td><td>{g.visits}</td><td>{g.points}</td><td>{g.last}</td><td><span className={g.status === "vip" ? "status-pill brass" : g.status === "invited" ? "status-pill pending" : "status-pill success"}>{g.status === "vip" ? t.vip : g.status === "invited" ? t.invited : t.active}</span></td><td><button className="icon-button" onClick={() => notify(g.name)} aria-label={t.view}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></section> : active === "rewards" ? <section className="content-panel"><PanelHeading title={t.rewardTitle} subtitle={t.rewardDesc} action={t.addReward} onAction={() => notify(t.addReward)} /><div className="reward-grid"><Reward title={t.tasting} points="1,500" icon="✳" onSelect={() => notify(t.editRules)} /><Reward title={t.birthday} points="800" icon="◇" onSelect={() => notify(t.editRules)} /><Reward title="Priority reservation" points="600" icon="⌁" onSelect={() => notify(t.editRules)} /></div></section> : active === "campaigns" ? <section className="content-panel"><PanelHeading title={t.campaignTitle} subtitle={t.campaignDesc} action={t.create} onAction={() => notify(t.create)} /><div className="campaign-card"><div className="campaign-icon"><Sparkles size={21} /></div><div><h3>Autumn tasting invitation</h3><p>Private invitation · Member segment · Draft preview</p></div><span className="status-pill pending">Draft</span></div><div className="campaign-card"><div className="campaign-icon"><Gift size={21} /></div><div><h3>Welcome back, thoughtfully</h3><p>Returning guests · Personalised message · Draft preview</p></div><span className="status-pill success">Ready</span></div></section> : active === "insights" ? <section className="content-panel"><PanelHeading title={t.insights} subtitle={t.overviewText} action={t.last7} onAction={() => notify(t.last7)} /><div className="insight-chart"><div className="chart-title">Guest activity <span>{t.last7}</span></div><div className="chart-bars large">{[38,58,45,74,52,87,65,95,61,77,49,82,68,90].map((h,i)=><span key={i} style={{height:`${h}%`}} />)}</div><p className="muted-note">{t.noBackend}</p></div></section> : <section className="content-panel"><PanelHeading title={t.settingsTitle} subtitle={t.settingsDesc} /><div className="settings-list"><button onClick={() => notify(t.settings)}><Utensils size={17} /><span><strong>Restaurant profile</strong><small>Logo, colors, venue details</small></span><ArrowRight size={16} /></button><button onClick={() => notify(t.editRules)}><Gift size={17} /><span><strong>Loyalty rules</strong><small>Points, privileges and expiry rules</small></span><ArrowRight size={16} /></button><button onClick={() => notify(t.manageTeam)}><Users size={17} /><span><strong>Team & permissions</strong><small>Roles and workspace access</small></span><ArrowRight size={16} /></button></div></section>}
              <section className="content-panel"><PanelHeading title={t.recent} subtitle={t.activity} action={t.viewAll} onAction={() => notify(t.viewAll)} /><ActivityRow icon={<ArrowDownLeft size={17} />} title={t.earn} detail="Amira Benali · 12 Oct" value="+120 pts" /><ActivityRow icon={<Gift size={17} />} title={t.redeem} detail="Youssef Idrissi · 10 Oct" value="Privilege" /><ActivityRow icon={<ArrowDownLeft size={17} />} title={t.earn} detail="Salma Alaoui · 08 Oct" value="+80 pts" /></section>
            </>
          )}

          <div className="demo-disclaimer"><ShieldCheck size={15} /><span>{t.demoNote} {t.noBackend}</span></div>
        </div>
        <footer className="app-footer"><span>© 2026 SEREIN</span><span>{t.sample} · {t.secure}</span><a href={`/${locale}`}>{t.openSite}</a></footer>
      </section>
      {toast && <div className="toast-message"><Check size={16} />{toast}</div>}
    </main>
  );
}

function GemIcon() { return <Sparkles size={17} />; }

function Metric({ icon, label, value, note }: { icon: React.ReactNode; label: string; value: string; note: string }) {
  return <article className="metric-card"><div className="metric-top"><span className="metric-icon">{icon}</span><MoreHorizontal size={16} className="muted-icon" /></div><p>{label}</p><strong className="metric-value">{value}</strong><span className="metric-note">{note}</span></article>;
}

function PanelHeading({ title, subtitle, action, onAction }: { title: string; subtitle?: string; action?: string; onAction?: () => void }) {
  return <div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-link" onClick={onAction}>{action}<ArrowRight size={15} /></button>}</div>;
}

function Reward({ title, points, icon, onSelect }: { title: string; points: string; icon: string; onSelect: () => void }) {
  return <article className="reward-card"><div className="reward-symbol">{icon}</div><h3>{title}</h3><p>{points} points</p><button className="button button-outline button-small" onClick={onSelect}>View privilege<ArrowRight size={14} /></button></article>;
}

function ActivityRow({ icon, title, detail, value }: { icon: React.ReactNode; title: string; detail: string; value: string }) {
  return <div className="activity-row"><span className="activity-icon">{icon}</span><div className="activity-copy"><strong>{title}</strong><small>{detail}</small></div><span className="activity-value">{value}</span></div>;
}