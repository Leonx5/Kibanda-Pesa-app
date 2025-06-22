import React, { useState, useEffect } from "react";
import BusinessCard from "./components/BusinessCard";

// ✅ Updated type: bilingual description
type Business = {
  name: string;
  description: { en: string; sw: string };
  rating: number;
  returns: string;
};

// ✅ Bilingual businesses
const allBusinesses: Business[] = [
  {
    name: "Mama Achieng's Kiosk",
    description: {
      en: "Popular kiosk selling household goods.",
      sw: "Kibanda maarufu kinachouza bidhaa za nyumbani.",
    },
    rating: 4.5,
    returns: "12% quarterly",
  },
  {
    name: "Barber254",
    description: {
      en: "Mobile barbershop in Nairobi.",
      sw: "Kinyozi cha kusafiri ndani ya Nairobi.",
    },
    rating: 4.2,
    returns: "10% quarterly",
  },
  {
    name: "BodaSmart",
    description: {
      en: "Motorcycle taxi with mobile payments.",
      sw: "Boda boda yenye malipo ya kidijitali.",
    },
    rating: 4.8,
    returns: "15% quarterly",
  },
  {
    name: "Kibanda Fresh",
    description: {
      en: "Wholesale vegetable supplier to hotels.",
      sw: "Msambazaji wa mboga kwa jumla kwa hoteli.",
    },
    rating: 4.6,
    returns: "14% quarterly",
  },
  {
    name: "QuickMill",
    description: {
      en: "Grain milling station in Kisumu.",
      sw: "Kinu cha kusaga nafaka Kisumu.",
    },
    rating: 4.1,
    returns: "9% quarterly",
  },
  {
    name: "M-Pesa Express",
    description: {
      en: "Busy mobile money agent in Kayole.",
      sw: "Agenzi ya M-Pesa yenye shughuli nyingi Kayole.",
    },
    rating: 4.3,
    returns: "11% quarterly",
  },
];

export default function App() {
  const [investments, setInvestments] = useState<string[]>(() => {
    const saved = localStorage.getItem("investments");
    return saved ? JSON.parse(saved) : [];
  });

  const [sortBy, setSortBy] = useState<"default" | "rating">("default");
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLanding, setShowLanding] = useState(true);

  const t = {
    en: {
      appTitle: "Kibanda Pesa",
      tagline: "Own a stake in local businesses 🚀",
      subtitle:
        "Kibanda Pesa lets you invest in real entrepreneurs and earn passive income every 3 months.",
      portfolioIntro: "My Portfolio:",
      portfolioNone: "You haven't invested in any businesses yet.",
      portfolioSome: (count: number) =>
        `You’ve invested in ${count} ${count === 1 ? "business" : "businesses"}.`,
      withdraw: "Withdraw All ❌",
      estimated: "Estimated Quarterly Earnings:",
      search: "Search businesses...",
      sort: "Sort by:",
      defaultSort: "Default",
      ratingSort: "Highest Rated",
      aboutTitle: "About Kibanda Pesa",
      aboutBody:
        "Kibanda Pesa empowers everyday investors to support real small businesses in Kenya — from barbershops to boda bodas to kiosks. Earn quarterly dividends and uplift communities directly. This is an MVP for testing the model.",
      footer: "Built by Leon Okoth – Dial A Chef Kenya • Prototype v1.0",
      enterApp: "Enter App",
      rating: "Rating",
      returns: "Returns",
      invest: "Invest 💸",
      invested: "Invested ✅",
    },
    sw: {
      appTitle: "Kibanda Pesa",
      tagline: "Miliki sehemu ya biashara za mitaani 🚀",
      subtitle:
        "Kibanda Pesa hukuwezesha kuwekeza kwa wafanyabiashara halisi na kupata mapato kila miezi mitatu.",
      portfolioIntro: "Portfolio Yangu:",
      portfolioNone: "Bado hujawekeza kwenye biashara yoyote.",
      portfolioSome: (count: number) => `Umewekeza kwenye biashara ${count}.`,
      withdraw: "Ondoa Uwekezaji Wote ❌",
      estimated: "Makadirio ya Mapato kwa Robo Mwaka:",
      search: "Tafuta biashara...",
      sort: "Panga kwa:",
      defaultSort: "Chaguo-msingi",
      ratingSort: "Kiwango cha Juu",
      aboutTitle: "Kuhusu Kibanda Pesa",
      aboutBody:
        "Kibanda Pesa ni jukwaa linalowawezesha wawekezaji wa kawaida kusaidia biashara ndogo ndogo Kenya — kutoka kwa kinyozi hadi mama mboga. Ukiwekeza, unapata gawio kila baada ya miezi mitatu. Huu ni mfano wa awali wa kujaribu wazo.",
      footer: "Imetengenezwa na Leon Okoth – Dial A Chef Kenya • Toleo la Kwanza",
      enterApp: "Ingia Ndani",
      rating: "Kiwango",
      returns: "Mapato",
      invest: "Wekeza 💸",
      invested: "Umewekeza ✅",
    },
  };

  const handleInvest = (name: string) => {
    setInvestments((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleExport = () => {
    const rows = [["Business", "Rating", "Returns"]];
    investments.forEach((name) => {
      const biz = allBusinesses.find((b) => b.name === name);
      if (biz) rows.push([biz.name, biz.rating.toString(), biz.returns]);
    });
    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_kibanda_investments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [investments]);

  const filteredBusinesses = allBusinesses.filter((biz) =>
    biz.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  if (showLanding) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
        }}
      >
        <img
          src="https://img.icons8.com/ios-filled/100/228BE6/shop.png"
          alt="Logo"
          style={{ width: 80, marginBottom: "1rem" }}
        />
        <h1>{t[language].appTitle}</h1>
        <p style={{ marginBottom: "2rem" }}>{t[language].tagline}</p>
        <button
          onClick={() => setShowLanding(false)}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#228BE6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {t[language].enterApp}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "1.5rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src="https://img.icons8.com/ios-filled/100/228BE6/shop.png"
          alt="Logo"
          style={{ width: 60, height: 60 }}
        />
        <h1 style={{ color: "#228BE6" }}>{t[language].appTitle}</h1>
      </div>

      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        🌍 Language:{" "}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "sw")}
        >
          <option value="en">English</option>
          <option value="sw">Kiswahili</option>
        </select>
      </div>

      <div
        style={{
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2>{t[language].tagline}</h2>
        <p>{t[language].subtitle}</p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong>{t[language].portfolioIntro}</strong>{" "}
        {investments.length > 0
          ? t[language].portfolioSome(investments.length)
          : t[language].portfolioNone}
      </div>

      {investments.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setInvestments([])}>
            {t[language].withdraw}
          </button>{" "}
          <button onClick={handleExport}>📤 Export</button>
        </div>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <strong>{t[language].estimated}</strong>{" "}
        {investments.length > 0 ? "KSh ???" : "KSh 0"}
      </div>

      <input
        type="text"
        placeholder={t[language].search}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        {t[language].sort}{" "}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "default" | "rating")}
        >
          <option value="default">{t[language].defaultSort}</option>
          <option value="rating">{t[language].ratingSort}</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          marginTop: "2rem",
        }}
      >
        {sortedBusinesses.map((biz) => (
          <BusinessCard
            key={biz.name}
            name={biz.name}
            description={biz.description[language]}
            rating={biz.rating}
            returns={biz.returns}
            onInvest={handleInvest}
            invested={investments.includes(biz.name)}
            t={t}
            language={language}
          />
        ))}
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <h3>{t[language].aboutTitle}</h3>
        <p>{t[language].aboutBody}</p>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.8rem" }}>
        {t[language].footer}
      </div>
    </div>
  );
}