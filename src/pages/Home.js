import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [resolvedAddress, setResolvedAddress] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleQueryChange = async (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.trim() === "") {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    input
                )}&format=json&addressdetails=1&limit=5&countrycodes=IL&bounded=1&viewbox=34.267,33.290,35.897,29.493`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                setSuggestions(data);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const { display_name, lat, lon } = suggestion;
        setQuery(display_name);
        setResolvedAddress({ fullAddress: display_name, lat, lon });
        setSuggestions([]);
        setError(null);
    };

    const handleUseLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                        const response = await fetch(geocodeUrl);
                        const data = await response.json();

                        if (data && data.display_name) {
                            setQuery(data.display_name);
                            setResolvedAddress({
                                fullAddress: data.display_name,
                                lat: latitude,
                                lon: longitude,
                            });
                            setError(null);
                        } else {
                            setError("Unable to retrieve your current location.");
                        }
                    } catch (err) {
                        setError("An error occurred while fetching your location.");
                        console.error(err);
                    }
                },
                () => {
                    setError("Geolocation permission denied.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    };

    const handleSearch = () => {
        if (resolvedAddress) {
            navigate("/parking", {
                state: {
                    address: resolvedAddress.fullAddress,
                    lat: resolvedAddress.lat,
                    lon: resolvedAddress.lon
                },
            });
        } else {
            setError("Please select a location first.");
        }
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "40px",
                background: "linear-gradient(135deg, #7284ed, #2575fc)",
                minHeight: "100vh",
                color: "white",
            }}
        >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>ברוך הבא לאחוזה</h1>
            <div style={{ marginBottom: "20px", width: "70%", margin: "0 auto" }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter a location"
                    style={{
                        padding: "12px",
                        width: "100%",
                        boxSizing: "border-box",
                        borderRadius: "15px",
                        border: "none",
                        fontSize: "1rem",
                        outline: "none",
                    }}
                />
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <ul
                        style={{
                            listStyle: "none",
                            padding: "0",
                            margin: "10px 0 0",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            maxHeight: "150px",
                            overflowY: "auto",
                            textAlign: "left",
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #f0f0f0",
                                    color: "#333",
                                }}
                            >
                                {suggestion.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <br />
            <button
                onClick={handleUseLocation}
                style={{
                    marginBottom: "10px",
                    padding: "12px 24px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
                Use My Current Location
            </button>
            <br />
            <button
                onClick={handleSearch}
                style={{
                    marginTop: "10px",
                    padding: "12px 24px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
                Search
            </button>
            {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
            {resolvedAddress && (
                <p style={{ color: "#fff", fontSize: "1.2rem" }}>
                    <strong>Resolved Address:</strong> {resolvedAddress.fullAddress}
                </p>
            )}
        </div>
    );
};

export default Home;