// src/components/Banks/BankCard.jsx
import React from "react";
import useStyles from "../List/ListStyles";
import {
  MdLocationOn,
  MdAccessTime,
  MdPhone,
  MdDirections,
} from "react-icons/md";

function initials(name = "") {
  // Example: "Bank Hapoalim" → "BH"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function BankCard({ bank, darkMode, onDirections }) {
  const c = useStyles();
  const iconColor = darkMode ? "#93c5fd" : "#2563eb";

  const telHref = bank.phone
    ? `tel:${String(bank.phone).replace(/\D/g, "")}`
    : undefined;

  return (
    <article className={c.bankCard} aria-label={`${bank.bankName} card`}>
      {/* ─────────── Logo ─────────── */}
      <div className={c.bankLogo} aria-hidden>
        {initials(bank.bankName)}
      </div>

      {/* ─────────── Title ─────────── */}
      <div className={c.titleRow}>
        <h3 className={c.bankTitle}>{bank.bankName}</h3>
      </div>

      {/* ─────────── Meta Info ─────────── */}
      <div className={c.metaRow}>
        <p className={c.metaItem}>
          <strong>Branch:</strong> {bank.branchName}
        </p>
        <p className={c.metaItem}>
          <strong>City:</strong> {bank.city}
        </p>
      </div>

      {/* ─────────── Address / Hours / Phone ─────────── */}
      <div className={c.infoRow}>
        <span>
          <MdLocationOn className={c.icon} style={{ color: iconColor }} />
          {bank.address}
        </span>
        <span>
          <MdAccessTime className={c.icon} style={{ color: iconColor }} />
          {bank.openDays} {bank.openHours}
        </span>
        <span>
          <MdPhone className={c.icon} style={{ color: iconColor }} />
          {bank.phone}
        </span>
      </div>

      {/* ─────────── Actions ─────────── */}
      <div className={c.actions}>
        {/* ✅ Directions inside map */}
        <button
          className={c.btnPrimary}
          onClick={() => onDirections?.({ lat: bank.lat, lng: bank.lng })}
        >
          <MdDirections
            style={{ verticalAlign: "middle", marginRight: 6 }}
          />
          Directions
        </button>

        {/* ✅ Call button */}
        {telHref && (
          <a href={telHref}>
            <button className={c.btnGhost}>
              <MdPhone style={{ verticalAlign: "middle", marginRight: 6 }} />
              Call
            </button>
          </a>
        )}
      </div>
    </article>
  );
}

export default BankCard;

