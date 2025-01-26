import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [query, setQuery] = useState("");
    const [resolvedAddress, setResolvedAddress] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim() === "") {
            setError("Please enter a location.");
            return;
        }

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    query
                )}&format=json&addressdetails=1&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const location = data[0];
                const fullAddress = location.display_name;
                const lat = location.lat;
                const lon = location.lon;

                setResolvedAddress({ fullAddress, lat, lon });
                setError(null);

                navigate("/parking", { state: { address: fullAddress, lat, lon } });
            } else {
                setError("Location not found. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while validating the location.");
            console.error(err);
        }
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
                                lat: data.lat,
                                lon: data.lon,
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
        <div style={{textAlign: "center", padding: "20px"}}>
            <h1>ברוך הבא לאחוזה</h1>
            <div style={{marginBottom: "10px", width: "70%", margin: "0 auto"}}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a location"
                    style={{
                        padding: "10px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                />
            </div>
            <br/>
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
            <br/>
            <button
                onClick={handleSearch}
                style={{
                    padding: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Search
            </button>
            {error && <p style={{color: "red"}}>{error}</p>}
            {resolvedAddress && (
                <p>
                    <strong>Resolved Address:</strong> {resolvedAddress.fullAddress}
                </p>
            )}
        </div>
    );
};

export default Home;