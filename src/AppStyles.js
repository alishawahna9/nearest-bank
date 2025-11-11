import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  headerContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },

  mainContainer: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 64px)",
    width: "100%",
    marginTop: "64px",
  },

  listSection: (props) => ({
    flex: 1,
    borderRight: props.darkMode ? "2px solid #222" : "2px solid #ccc",
    overflowY: "auto",
    height: "100%",
    direction: "rtl",
    backgroundColor: props.darkMode ? "#0d1117" : "#f8f9fa",

    /* 🎨 עיצוב הסקרול לפי מצב */
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: props.darkMode ? "#0d1117" : "#e0e0e0",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: props.darkMode ? "#4e73df" : "#3558b0",
      borderRadius: "10px",
      border: props.darkMode
        ? "2px solid #0d1117"
        : "2px solid #e0e0e0",
      transition: "background-color 0.3s ease",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: props.darkMode ? "#6c8cff" : "#1e3a8a",
    },

    /* Firefox */
    scrollbarWidth: "thin",
    scrollbarColor: props.darkMode
      ? "#4e73df #0d1117"
      : "#3558b0 #e0e0e0",
  }),

  mapSection: {
    flex: 2,
    overflow: "hidden",
    position: "relative",
  },
}));

export default useStyles;
