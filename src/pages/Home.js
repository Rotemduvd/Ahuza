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
                )}&format=json&addressdetails=1&limit=5`
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

        // Navigate to the parking page
        navigate("/parking", { state: { address: display_name, lat, lon } });
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

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>ברוך הבא לאחוזה</h1>
            <div style={{ marginBottom: "10px", width: "70%", margin: "0 auto" }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter a location"
                    style={{
                        padding: "10px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                />
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <ul
                        style={{
                            listStyle: "none",
                            padding: "10px",
                            margin: "0",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
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
                                    padding: "8px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #f0f0f0",
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
                    marginBottom: "20px",
                    padding: "10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Use My Current Location
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {resolvedAddress && (
                <p>
                    <strong>Resolved Address:</strong> {resolvedAddress.fullAddress}
                </p>
            )}
        </div>
    );
};

export default Home;