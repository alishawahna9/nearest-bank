import React, { useEffect, useState } from "react";
import BankCard from "../Banks/BankCard";
import useStyles from "./ListStyles";

function List({ darkMode, nearestBank, nearbyBanks = [], address, onDirections }) {
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // ───────────── Handle Scroll Effect ─────────────
  /**
   * Detects when the user scrolls more than 30px down the list.
   * Adds a subtle visual effect (blur / shadow) to the sticky header.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ───────────── Component Layout ─────────────
  return (
    <div
      className={`${classes.listWrapper} ${
        darkMode ? classes.darkMode : classes.lightMode
      }`}
    >
      {/* ─────────── Sticky Header ─────────── */}
      <div
        className={`${classes.listHeader} ${
          darkMode ? classes.listHeaderDark : classes.listHeaderLight
        } ${scrolled ? classes.listHeaderScrolled : ""}`}
      >
        {nearestBank
          ? "Nearest Banks (within 10 km)"
          : "No Nearby Banks Found"}
      </div>

      {/* ─────────── Scrollable Content Section ─────────── */}
      <div className={classes.listContent}>
        {/* Display the nearest bank info at the top */}
        {nearestBank ? (
          <div className={classes.nearestCard}>
            <p>
              <span
                style={{
                  color: darkMode ? "#60a5fa" : "#1976d2",
                  fontWeight: "600",
                }}
              >
                •
              </span>{" "}
              The nearest bank is{" "}
              <strong>
                {nearestBank.bankName} ({nearestBank.branchName})
              </strong>{" "}
              —{" "}
              <strong>
                {nearestBank.distance != null
                  ? (nearestBank.distance / 1000).toFixed(2)
                  : "0.00"}{" "}
                km
              </strong>{" "}
              away.
            </p>
          </div>
        ) : (
          <p className={classes.noResults}>
            Try moving the map or using “Find Me”.
          </p>
        )}

        {/* ─────────── Bank Cards (List of Results) ─────────── */}
        <div className={classes.bankCardsContainer}>
          {nearbyBanks.length > 0 ? (
            nearbyBanks.map((bank, index) => (
              <BankCard
                key={index}
                bank={bank}
                darkMode={darkMode}
                /**
                 * 🔹 Called when the user clicks the "Directions" button.
                 * Passes destination coordinates (lat/lng) to App.jsx,
                 * which then calls Map.showDirections() to display a route.
                 */
                onDirections={(destination) => {
                  console.log("📍 List → sending destination to App:", destination);
                  onDirections(destination);
                }}
              />
            ))
          ) : (
            !nearestBank && <p>No banks found nearby.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;


