import React from "react";
import { Star, PiggyBank } from "lucide-react";

interface Props {
  name: string;
  description: string;
  rating: number;
  returns: string;
  onInvest: (name: string) => void;
  invested: boolean;
}

const BusinessCard: React.FC<Props> = ({
  name,
  description,
  rating,
  returns,
  onInvest,
  invested,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "1rem",
        margin: "1rem 0",
        backgroundColor: "#fff",
      }}
    >
      <h2>{name}</h2>
      <p>{description}</p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Star size={16} color="gold" />
        <span>{rating} / 5</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <PiggyBank size={16} color="green" />
        <span>{returns}</span>
      </div>

      <button
        onClick={() => onInvest(name)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: invested ? "#4caf50" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {invested ? "Invested ✅" : "Invest 💸"}
      </button>
    </div>
  );
};

export default BusinessCard;
