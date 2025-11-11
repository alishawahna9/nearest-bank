import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useStyles from "./HeaderStyles";

/**
 * Header component for the Nearest Bank app.
 * Includes the app title, "Find Me" button, search bar, and dark/light mode toggle.
 * Props:
 * - findme: Function that triggers geolocation to find user's location.
 * - searchLocation: Function that searches for a city or bank.
 */
function Header({ findme, searchLocation, darkMode, toggleDarkMode }) {
  const ClassNames = useStyles(); // Load component-specific styles
  const [searchValue, setSearchValue] = useState(""); // Local state for search input

  /**
   * Handles the search action when the user presses Enter.
   */
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      searchLocation(searchValue);
    }
  };

  return (
    // The top navigation bar
    <AppBar
      position="static"
      className={darkMode ? ClassNames.appBarDark : ClassNames.appBarLight}
    >
      <Toolbar className={ClassNames.Toolbar}>
        {/* App title */}
        <Typography variant="h4" className={ClassNames.title}>
          Nearest Bank
        </Typography>

      
        <Box display="flex" alignItems="center" className={ClassNames.searchBox}>
          
          {/* Button to locate the user's position */}
          <Button
            startIcon={<RoomIcon />}
            onClick={findme}
            className={ClassNames.findMeButton}
          >
            Find Me
          </Button>

          {/* Divider and label for the search section */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ gap: 1.5, marginLeft: "10px", marginRight: "10px" }}
          >
            <Typography variant="h6" className={ClassNames.separator}>
              |
            </Typography>
            <Typography variant="h6" className={ClassNames.subTitle}>
              Find a Bank
            </Typography>
          </Box>

          {/* Search input with icon */}
          <div
            className={`${ClassNames.search} ${
              darkMode ? ClassNames.searchDark : ""
            }`}
          >
            <div className={ClassNames.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search city or bank..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              classes={{
                root: ClassNames.inputRoot,
                input: ClassNames.inputInput,
              }}
            />
          </div>

          {/* Toggle between light and dark mode */}
          <IconButton
            onClick={toggleDarkMode}
            className={ClassNames.darkModeBtn}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

