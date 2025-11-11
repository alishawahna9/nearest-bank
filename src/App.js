import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline } from '@mui/material';
import useStyles from './AppStyles';

function App() {
  // ─────────── THEME & STYLES ───────────
  // Pass darkMode to useStyles for dynamic styling (e.g., scrollbar color)
  const [darkMode, setDarkMode] = useState(false);
  const classes = useStyles({ darkMode });

  // Reference to the Map component for invoking its public methods
  const mapRef = useRef();

  // ─────────── GLOBAL STATE ───────────
  const [nearestBank, setNearestBank] = useState(null);
  const [nearbyBanks, setNearbyBanks] = useState([]);
  const [address, setAddress] = useState("");

  // ─────────── DARK MODE LOGIC ───────────
  /**
   * Automatically detects if it's currently night time.
   * Returns true for hours between 18:00–05:59.
   */
  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  };

  /**
   * Automatically updates dark mode every hour
   * based on the user's system time.
   */
  useEffect(() => {
    setDarkMode(isNightTime());
    const interval = setInterval(() => setDarkMode(isNightTime()), 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle manually between dark and light modes
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ─────────── MAP INTEGRATION ───────────
  /**
   * Triggers the "Find Me" button → asks the Map component to locate user.
   */
  const handleFindMe = () => mapRef.current?.findMyLocation();

  /**
   * Performs a city or bank search → handled by the Map component.
   */
  const handleSearchLocation = (query) => mapRef.current?.searchLocation(query);

  /**
   * Receives the nearest and nearby banks data from the Map component.
   */
  const handleNearestBankFound = (data) => {
    if (!data) return;
    setNearestBank(data.nearest || null);
    setNearbyBanks(data.nearbyBanks || []);
    setAddress(data.address || "");
  };

  /**
   * Handles "Directions" clicks from the BankCard → 
   * sends destination coordinates to the Map for route display.
   */
  const handleDirections = (destination) => {
    console.log("📍 App received directions request:", destination);
    if (!destination?.lat || !destination?.lng) {
      console.error("❌ Invalid destination coordinates:", destination);
      return;
    }
    mapRef.current?.showDirections(destination);
  };


  // ─────────── INITIAL MAP LOAD ───────────
  /**
   * Automatically loads "Tel Aviv" as the initial location
   * after the map is fully initialized.
   */
  useEffect(() => {
    const waitForMap = setInterval(() => {
      if (mapRef.current && typeof mapRef.current.searchLocation === "function") {
        mapRef.current.searchLocation("Tel Aviv");
        clearInterval(waitForMap);
      }
    }, 300); // checks every 300ms until the Map is ready

    return () => clearInterval(waitForMap);
  }, []);

  // ─────────── UI STRUCTURE ───────────
  return (
    <>
      <CssBaseline />

      {/* ───── Header Section ───── */}
      <div className={classes.headerContainer}>
        <Header
          findme={handleFindMe}
          searchLocation={handleSearchLocation}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>

      {/* ───── Main Content Area (List + Map) ───── */}
      <div
        className={classes.mainContainer}
        style={{
          backgroundColor: darkMode ? '#121212' : '#fff',
          color: darkMode ? '#eee' : '#000',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Left Section — Bank List */}
        <div className={classes.listSection}>
          <List
            darkMode={darkMode}
            nearestBank={nearestBank}
            nearbyBanks={nearbyBanks}
            address={address}
            onDirections={handleDirections} // enables Directions button inside list
          />
        </div>

        {/* Right Section — Google Map */}
        <div className={classes.mapSection}>
          <Map
            ref={mapRef}
            darkMode={darkMode}
            onNearestBankFound={handleNearestBankFound}
          />
        </div>
      </div>
    </>
  );
}

export default App;
