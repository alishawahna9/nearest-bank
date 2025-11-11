import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  /* ===== SCROLLED HEADER EFFECT ===== */
  listHeaderScrolled: {
    backgroundColor: "rgba(25, 118, 210, 0.9) !important", // semi-transparent blue
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
    transform: "scale(0.98)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },

  /* ===== MAIN STRUCTURE ===== */
  listHeader: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    padding: "14px 0",
    textAlign: "center",
    fontWeight: 800,
    fontSize: "1.25rem",
    letterSpacing: ".3px",
    borderBottom: "1px solid transparent",
    backdropFilter: "blur(8px)",
    transition:
      "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
  },

  listContent: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
  },

  /* ===== BANK CARD ===== */
  bankCard: {
    display: "grid",
    gridTemplateColumns: "56px 1fr",
    gap: "10px 14px",
    alignItems: "center",
    padding: "16px",
    marginBottom: 16,
    borderRadius: 16,
    border: "1px solid transparent",
    boxShadow: "0 6px 14px rgba(0,0,0,.10)",
    transition:
      "transform .2s ease, box-shadow .25s ease, background-color .3s ease",
    position: "relative",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 18px rgba(0,0,0,.16)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      background: "linear-gradient(180deg,#60a5fa,#22d3ee)",
    },
  },

  bankLogo: {
    gridRow: "1 / span 2",
    gridColumn: 1,
    width: 56,
    height: 56,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    fontSize: "1rem",
    letterSpacing: 0.3,
  },

  titleRow: {
    gridColumn: 2,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },

  bankTitle: {
    fontWeight: 800,
    fontSize: "1.05rem",
    margin: 0,
  },

  metaRow: {
    gridColumn: "2",
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    gap: "6px 16px",
  },

  metaItem: {
    margin: 0,
    fontSize: ".95rem",
    lineHeight: 1.45,
  },

  infoRow: {
    gridColumn: "1 / -1",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px 18px",
    alignItems: "center",
    marginTop: 4,
  },

  icon: { verticalAlign: "middle", marginRight: 6 },

  actions: {
    gridColumn: "2",
    display: "flex",
    gap: 10,
    marginTop: 6,
  },

  btnPrimary: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnGhost: {
    padding: "8px 12px",
    borderRadius: 10,
    background: "transparent",
    border: "1px solid",
    fontWeight: 700,
    cursor: "pointer",
  },

  /* ===== LIGHT MODE ===== */
  lightMode: {
    backgroundColor: "#eef2f7",
    color: "#1f2937",
    "& $bankCard": {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
    },
    "& $bankLogo": {
      background: "linear-gradient(135deg,#eff6ff,#e0f2fe)",
      color: "#1f2937",
      border: "1px solid #dbeafe",
    },
    "& $bankTitle": { color: "#1d4ed8" },
    "& $btnPrimary": { background: "#2563eb", color: "#fff" },
    "& $btnGhost": { color: "#2563eb", borderColor: "#93c5fd" },
  },

  /* ===== DARK MODE ===== */
  darkMode: {
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    "& $bankCard": {
      backgroundColor: "#1f2937",
      borderColor: "#374151",
      boxShadow: "0 8px 18px rgba(0,0,0,.55)",
    },
    "& $bankLogo": {
      background: "linear-gradient(135deg,#0b1220,#0e7490)",
      color: "#e2e8f0",
      border: "1px solid #334155",
    },
    "& $bankTitle": { color: "#93c5fd" },
    "& $btnPrimary": { background: "#3b82f6", color: "#0b1220" },
    "& $btnGhost": { color: "#93c5fd", borderColor: "#475569" },
  },

  /* ===== HEADER THEMES ===== */
  listHeaderLight: {
    background: "rgba(255,255,255,0.85)",
    color: "#2563eb",
    borderBottom: "1px solid #e0e7ff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },

  listHeaderDark: {
    background: "rgba(17,24,39,0.85)",
    color: "#93c5fd",
    borderBottom: "1px solid #1e293b",
    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
  },
}));

export default useStyles;
