import React, { useState, useEffect } from "react";
import BusinessCard from "./components/BusinessCard";

type Business = {
  name: string;
  description: string;
  rating: number;
  returns: string;
};

const allBusinesses: Business[] = [
  {
    name: "Mama Achieng's Kiosk",
    description: "Popular kiosk selling household goods.",
    rating: 4.5,
    returns: "12% quarterly",
  },
  {
    name: "Barber254",
    description: "Mobile barbershop in Nairobi.",
    rating: 4.2,
    returns: "10% quarterly",
  },
  {
    name: "BodaSmart",
    description: "Motorcycle taxi with mobile payments.",
    rating: 4.8,
    returns: "15% quarterly",
  },
  {
    name: "Kibanda Fresh",
    description: "Wholesale vegetable supplier to hotels.",
    rating: 4.6,
    returns: "14% quarterly",
  },
  {
    name: "QuickMill",
    description: "Grain milling station in Kisumu.",
    rating: 4.1,
    returns: "9% quarterly",
  },
  {
    name: "M-Pesa Express",
    description: "Busy mobile money agent in Kayole.",
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

  const t = {
    en: {
      appTitle: "Kibanda Pesa",
      tagline: "Own a stake in local businesses 🚀",
      subtitle:
        "Kibanda Pesa lets you invest in real entrepreneurs and earn passive income every 3 months.",
      portfolioIntro: "My Portfolio:",
      portfolioNone: "You haven't invested in any businesses yet.",
      portfolioSome: (count: number) =>
        `You’ve invested in ${count} ${
          count === 1 ? "business" : "businesses"
        }.`,
      withdraw: "Withdraw All ❌",
      estimated: "Estimated Quarterly Earnings:",
      search: "Search businesses...",
      sort: "Sort by:",
      defaultSort: "Default",
      ratingSort: "Highest Rated",
      aboutTitle: "About Kibanda Pesa",
      aboutBody:
        "Kibanda Pesa is a platform that empowers everyday investors to support real small businesses in Kenya — from barbershops to boda bodas to food kiosks. By owning a share in these businesses, you earn quarterly dividends and uplift communities directly. This is a Minimum Viable Product (MVP) for testing the model.",
      footer: "Built by Leon Okoth – Dial A Chef Kenya • Prototype v1.0",
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
      footer:
        "Imetengenezwa na Leon Okoth – Dial A Chef Kenya • Toleo la Kwanza",
    },
  };

  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

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
      if (biz) {
        rows.push([biz.name, biz.rating.toString(), biz.returns]);
      }
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

  // ✅ Save investments to localStorage whenever they change
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

  return (
    <div
      style={{
        padding: "1.5rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* Logo + Title */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src="https://img.icons8.com/ios-filled/100/228BE6/shop.png"
          alt="Kibanda Pesa Logo"
          style={{ width: 60, height: 60 }}
        />
        <h1
          style={{ margin: "0.5rem 0 0", fontSize: "2rem", color: "#228BE6" }}
        >
          {t[language].appTitle}
        </h1>
      </div>

      {/* Language Toggle */}
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <label>
          🌍 Language:{" "}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "sw")}
          >
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>
        </label>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          backgroundColor: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
          {t[language].tagline}
        </h2>
        <p style={{ margin: 0 }}>{t[language].subtitle}</p>
      </div>

      {/* Portfolio Summary */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
        }}
      >
        <strong>{t[language].portfolioIntro}</strong>{" "}
        {investments.length > 0 ? (
          <span>{t[language].portfolioSome(investments.length)}</span>
        ) : (
          <span>{t[language].portfolioNone}</span>
        )}
      </div>

      {investments.length > 0 && (
        <div
          style={{
            margin: "1rem 0",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setInvestments([])}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {t[language].withdraw}
          </button>

          <button
            onClick={handleExport}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            📤 Export Investments
          </button>
        </div>
      )}

      {/* Estimated Quarterly Earnings */}
      <div
        style={{
          margin: "1rem 0",
          padding: "1rem",
          backgroundColor: "#e6f7ff",
          borderRadius: 8,
        }}
      >
        <strong>{t[language].estimated}</strong>{" "}
        {investments.length > 0 ? (
          <span>
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
              minimumFractionDigits: 0,
            }).format(
              investments
                .map((name) => {
                  const biz = allBusinesses.find((b) => b.name === name);
                  if (!biz) return 0;
                  const percent = parseFloat(biz.returns);
                  return Math.round((percent / 100) * 1000);
                })
                .reduce((a, b) => a + b, 0)
            )}
          </span>
        ) : (
          <span>KSh 0</span>
        )}
      </div>

      {/* Search Bar */}
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Search businesses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: 400,
          }}
        />
      </div>

      {/* Filter Dropdown */}
      <div style={{ marginTop: "1rem" }}>
        <label>
          {t[language].sort}{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "default" | "rating")}
          >
            <option value="default">{t[language].defaultSort}</option>
            <option value="rating">{t[language].ratingSort}</option>
          </select>
        </label>
      </div>

      {/* Business Cards Grid */}
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
            description={biz.description}
            rating={biz.rating}
            returns={biz.returns}
            onInvest={handleInvest}
            invested={investments.includes(biz.name)}
          />
        ))}
      </div>

      {/* About Section */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          backgroundColor: "#f4f4f4",
          borderRadius: 8,
          textAlign: "center",
          fontSize: "0.95rem",
          color: "#444",
        }}
      >
        <h3>{t[language].aboutTitle}</h3>
        <p style={{ maxWidth: "600px", margin: "0 auto" }}>
          {t[language].aboutBody}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #ccc",
          fontSize: "0.85rem",
          color: "#777",
        }}
      >
        {t[language].footer}
      </div>
    </div>
  );
}
