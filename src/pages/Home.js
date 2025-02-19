import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [query, setQuery] = useState("");
    const [resolvedAddress, setResolvedAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // New state for loading indicator
    const [searchCompleted, setSearchCompleted] = useState(false); // To track if the first search is done
    const navigate = useNavigate();

    const API_KEY = "pk.2724ce5ac8a6f4e741507498cbcb687e"; // Replace with your LocationIQ API key

// Handle query change
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        setSearchCompleted(false); // Reset searchCompleted if query is changed
    };

    // Trigger search after pressing Enter or clicking Search
    const handleSearchTrigger = async (e) => {
        if (e.key === "Enter" || e.type === "click") {
            if (!searchCompleted) {
                // First press: fetch suggestion and fill in the bar
                if (query.trim() === "") {
                    setError("Please enter a location.");
                    return;
                }

                setLoading(true); // Show loading indicator
                await fetchSuggestion(query); // Fetch the suggestion
            } else {
                // Second press: navigate to the next page
                if (resolvedAddress) {
                    navigate("/parking", {
                        state: {
                            address: resolvedAddress.display_name,
                            lat: resolvedAddress.lat,
                            lon: resolvedAddress.lon,
                        },
                    });
                } else {
                    setError("Please select a location first.");
                }
            }
        }
    };

    // Fetch the top suggestion based on the user's query
    const fetchSuggestion = async (query) => {
        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/search.php`,
                {
                    params: {
                        key: API_KEY, // Your API token
                        q: query,
                        format: "json",
                        limit: 1, // Only 1 result
                        bounded: 1,
                    },
                }
            );
            const data = response.data;

            if (data && data.length > 0) {
                setResolvedAddress(data[0]); // Use the first suggestion
                setQuery(data[0].display_name); // Show the address in the input
                setError(null);
                setSearchCompleted(true); // Mark that search is completed
            } else {
                setResolvedAddress(null);
                setError("No location found.");
            }
        } catch (err) {
            console.error("Error fetching suggestion:", err);
            setError("Error fetching data, please try again.");
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "40px",
                background: "linear-gradient(135deg, #0d0d0d, #1a1a1a, #292929)",
                minHeight: "100vh",
                color: "white",
                fontFamily: "'Handjet', sans-serif",
            }}
        >
            <h1 style={{fontSize: "2.5rem", marginBottom: "20px"}}>ברוך הבא לאחוזה</h1>
            <div style={{marginBottom: "20px", width: "70%", margin: "0 auto", fontFamily: "'Handjet', sans-serif",}}>
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyDown={handleSearchTrigger} // Trigger search on Enter key
                    placeholder="חפש כתובת"
                    style={{
                        fontFamily: "'Handjet', sans-serif",
                        padding: "12px",
                        width: "80%",
                        boxSizing: "border-box",
                        borderRadius: "15px",
                        border: "3px solid #ddd",
                        borderColor: "#f39c58",
                        fontSize: "1rem",
                        outline: "none",
                        direction: "rtl",
                        textAlign: "right",
                    }}
                />

                {loading && (
                    <p style={{color: "white"}}>
                        Searching... <span>🔍</span>
                    </p>
                )}
            </div>
            <br/>
            <button
                onClick={handleSearchTrigger} // Trigger search on button click
                style={{
                    fontFamily: "'Handjet', sans-serif",
                    marginTop: "10px",
                    padding: "12px 24px",
                    backgroundColor: "#f39c58",
                    color: "white",
                    border: "none",
                    borderRadius: "15px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#dc8125")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f39c58")}
            >
                {searchCompleted ? "Proceed to Parking" : "Search"}
            </button>
            <br/>
            {error && <p style={{color: "#ff6b6b"}}>{error}</p>}
        </div>
    );
};

export default Home;