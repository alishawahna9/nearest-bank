import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  /* ─────────── Light Mode AppBar ─────────── */
  appBarLight: {
    background: "linear-gradient(90deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%)",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    transition: "all 0.4s ease",
    backdropFilter: "blur(4px)",
  },

  /* ─────────── Dark Mode AppBar ─────────── */
  appBarDark: {
    backgroundColor: "#0f172a !important",
    color: "#93c5fd !important", // light blue text at night
    borderBottom: "1px solid #334155",
    boxShadow: "0 2px 10px rgba(0,0,0,.55)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  },

  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
  },

  /* ─────────── Title ─────────── */
  title: {
    fontWeight: 800,
    fontSize: "1.8rem",
    letterSpacing: "0.3px",
    textShadow: "0 2px 4px rgba(0,0,0,0.25)",
    transition: "color 0.3s ease",
  },

  /* ─────────── Subtitle & Separator ─────────── */
  subTitle: {
    fontWeight: 500,
    fontSize: "1.05rem",
    marginRight: "8px",
    transition: "color 0.3s ease",
  },

  separator: {
    marginLeft: "12px",
    marginRight: "8px",
    fontWeight: 400,
    fontSize: "1.2rem",
    transition: "color 0.3s ease",
  },

  /* ─────────── Find Me Button ─────────── */
  findMeButton: {
    color: "inherit !important", // inherits from mode
    backgroundColor: "transparent !important",
    textTransform: "none !important",
    fontWeight: "600 !important",
    fontSize: "15px !important",
    padding: "4px 14px !important",
    borderRadius: "8px !important",
    transition: "background-color 0.25s ease, transform 0.15s ease",
    "&:hover": {
      backgroundColor: "rgba(147,197,253,0.15) !important", // subtle blue overlay
      transform: "translateY(-1px)",
    },
  },

  /* ─────────── Search Bar ─────────── */
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    padding: "2px 10px",
    marginLeft: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  searchDark: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    "& input": { color: "#93c5fd !important" },
    "& svg": { color: "#93c5fd" },
  },

  /* ─────────── Dark Mode Toggle Button ─────────── */
  darkModeBtn: {
    color: "inherit !important",
    marginLeft: "15px !important",
    fontWeight: 600,
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgba(147,197,253,0.1) !important",
    },
  },
}));

export default useStyles;




