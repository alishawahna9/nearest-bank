import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import useStyles, { darkMapStyle, luxuryMapStyle } from "./styles";

const centerDefault = { lat: 32.0853, lng: 34.7818 }; // Default center: Tel Aviv

const Map = forwardRef(({ darkMode, onNearestBankFound }, ref) => {
  const classes = useStyles();
  const [center, setCenter] = useState(centerDefault);
  const [banks, setBanks] = useState([]);
  const [nearestBank, setNearestBank] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const mapRef = useRef(null);

  // Load banks from JSON
  useEffect(() => {
    fetch("/banks.json")
      .then((res) => res.json())
      .then((data) => setBanks(data))
      .catch((err) => console.error("Error loading banks:", err));
  }, []);

  // Handle map load
  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  // Compute nearby banks (within 10 km)
  const computeNearby = useCallback(
    (origin) => {
      if (!window.google?.maps?.geometry || banks.length === 0) return;
      const R = 10000;
      const originLL = new window.google.maps.LatLng(origin.lat, origin.lng);

      const nearbyBanks = banks
        .map((b) => {
          const d = window.google.maps.geometry.spherical.computeDistanceBetween(
            originLL,
            new window.google.maps.LatLng(b.lat, b.lng)
          );
          return { ...b, distance: d };
        })
        .filter((b) => b.distance <= R)
        .sort((a, b) => a.distance - b.distance);

      const nearest = nearbyBanks[0] ?? null;
      setNearestBank(nearest);
      onNearestBankFound?.({ nearest, nearbyBanks });
    },
    [banks, onNearestBankFound]
  );

  // Auto compute nearby when center changes
  useEffect(() => {
    if (banks.length > 0 && center) {
      const timer = setTimeout(() => computeNearby(center), 400);
      return () => clearTimeout(timer);
    }
  }, [banks, center, computeNearby]);

  // Show route between user and selected bank
// Show route between user and selected bank
const showDirections = (destination) => {
  if (!mapRef.current || !window.google?.maps?.DirectionsService) {
    alert("Directions service not available yet.");
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();

  // Clear previous route renderer if exists
  if (directionsRenderer) {
    directionsRenderer.setMap(null);
    setDirectionsRenderer(null);
  }

  // Clear previous destination marker if exists
  if (window.currentDestinationMarker) {
    window.currentDestinationMarker.setMap(null);
    window.currentDestinationMarker = null;
  }

  const renderer = new window.google.maps.DirectionsRenderer({
    map: mapRef.current,
    suppressMarkers: true, // Hide default Google markers
    polylineOptions: {
      strokeColor: darkMode ? "#60a5fa" : "#1d4ed8", // Blue route
      strokeWeight: 6,
      strokeOpacity: 0.9,
    },
  });

  const origin = userLocation || center;

  directionsService.route(
    {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        renderer.setDirections(result);
        setDirectionsRenderer(renderer);

        // 🔵 Blue marker for origin
        new window.google.maps.Marker({
          position: origin,
          map: mapRef.current,
          icon: {
            url: "https://maps.google.com/mapfiles/kml/paddle/blu-circle.png",
            scaledSize: window.google?.maps?.Size
              ? new window.google.maps.Size(40, 40)
              : undefined,
          },
          title: "Start",
        });

        // 🔴 Red marker for current destination
        const destinationMarker = new window.google.maps.Marker({
          position: destination,
          map: mapRef.current,
          icon: {
            url: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
            scaledSize: window.google?.maps?.Size
              ? new window.google.maps.Size(40, 40)
              : undefined,
          },
          title: "Destination",
        });

        // Save reference to remove next time
        window.currentDestinationMarker = destinationMarker;
      } else {
        alert("Could not display route: " + status);
      }
    }
  );
};



  // Expose functions to parent (App.jsx)
  useImperativeHandle(ref, () => ({
    // Find user's location
    findMyLocation: () => {
      if (!("geolocation" in navigator))
        return alert("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(newCenter);
          setCenter(newCenter);
          if (mapRef.current) {
            mapRef.current.panTo(newCenter);
            mapRef.current.setZoom(14);
          }
          computeNearby(newCenter);
        },
        (err) => {
          console.error(err);
          alert("Unable to access your location.");
        }
      );
    },

    // Search for a bank or address
    searchLocation: (query) => {
      if (!query?.trim()) return;
      const q = query.toLowerCase();

      const matched = banks.find(
        (b) =>
          b.bankName.toLowerCase().includes(q) ||
          b.branchName.toLowerCase().includes(q)
      );

      if (matched) {
        const focus = { lat: matched.lat, lng: matched.lng };
        setCenter(focus);
        setSelectedBank(null); // Do not open info card automatically
        if (mapRef.current) {
          mapRef.current.panTo(focus);
          mapRef.current.setZoom(15);
        }
        computeNearby(focus);
        return;
      }

      // Fallback: geocode address or city
      if (window.google?.maps?.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: query }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            const loc = results[0].geometry.location;
            const focus = { lat: loc.lat(), lng: loc.lng() };
            setCenter(focus);
            setSelectedBank(null);
            if (mapRef.current) {
              mapRef.current.panTo(focus);
              mapRef.current.setZoom(13);
            }
            computeNearby(focus);
          } else {
            alert("No matching city or bank found.");
          }
        });
      } else {
        alert("Google Maps API not fully loaded.");
      }
    },

    showDirections,
  }));

  return (
    <div className={classes.mapWrapper}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["geometry", "places"]}
        
      >
        <GoogleMap
          onLoad={handleMapLoad}
          center={center}
          zoom={13}
          options={{
            styles: darkMode ? darkMapStyle : luxuryMapStyle,
            disableDefaultUI: false,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            styles: [
              ...(darkMode ? darkMapStyle : luxuryMapStyle),
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              { featureType: "transit", stylers: [{ visibility: "off" }] },
            ],
          }}
          mapContainerClassName={classes.mapContainer}
        >
          {/* Blue user location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your current location"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}

          {/* All bank markers (selected one in red) */}
          {window.google &&
            banks.map((b, i) => (
              <Marker
                key={i}
                position={{ lat: b.lat, lng: b.lng }}
                onClick={() => setSelectedBank(b)}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none">
                      <path fill="${
                        selectedBank && b.lat === selectedBank.lat && b.lng === selectedBank.lng
                          ? "#dc2626" // Red for selected
                          : darkMode
                          ? "#3b82f6" // Blue for dark mode
                          : "#2563eb" // Blue for light mode
                      }"
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5" fill="white"/>
                    </svg>
                  `)}`,
                  scaledSize: window.google?.maps?.Size
                    ? new window.google.maps.Size(42, 42)
                    : undefined,
                  anchor: window.google?.maps?.Point
                    ? new window.google.maps.Point(21, 42)
                    : undefined,
                }}
                animation={window.google?.maps?.Animation?.DROP}
              />
            ))}

          {/* Info card - only on click */}
          {selectedBank && (
            <OverlayView
              position={{ lat: selectedBank.lat, lng: selectedBank.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                style={{
                  transform: "translate(-50%, -115%)",
                  background: darkMode ? "#1f2937" : "#ffffff",
                  color: darkMode ? "#f3f4f6" : "#111827",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  width: "300px",
                  padding: "14px 16px",
                  fontFamily: "Inter, sans-serif",
                  border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "600",
                      color: darkMode ? "#60a5fa" : "#1d4ed8",
                    }}
                  >
                    {selectedBank.bankName}
                  </h3>
                  <button
                    onClick={() => setSelectedBank(null)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: darkMode ? "#aaa" : "#666",
                      cursor: "pointer",
                      fontSize: "18px",
                      padding: "0 4px",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Details */}
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  <strong>Branch:</strong> {selectedBank.branchName}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  <strong>Address:</strong> {selectedBank.address || "N/A"}
                </p>

                {/* Opening hours */}
                {selectedBank.openDays && selectedBank.openHours && (
                  <p style={{ margin: "4px 0", fontSize: "14px" }}>
                    <strong>Hours:</strong> {selectedBank.openDays}{" "}
                    {selectedBank.openHours}
                  </p>
                )}

                {/* Distance */}
                {selectedBank.distance !== undefined && (
                  <p style={{ margin: "4px 0", fontSize: "14px" }}>
                    <strong>Distance:</strong>{" "}
                    {selectedBank.distance >= 1000
                      ? (selectedBank.distance / 1000).toFixed(2) + " km"
                      : selectedBank.distance.toFixed(0) + " m"}
                  </p>
                )}

                {/* Directions button */}
                <button
                  onClick={() =>
                    showDirections({
                      lat: selectedBank.lat,
                      lng: selectedBank.lng,
                    })
                  }
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    background: darkMode ? "#2563eb" : "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 0",
                    fontSize: "15px",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  🚗 Get Directions
                </button>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});

export default Map;
