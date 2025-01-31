import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "cheerio";
import { getDistance } from "geolib";
import parkingSpots from "../data/parkingSpots";

const Parking = () => {
    const location = useLocation();
    const { lat: userLat, lon: userLon } = location.state || {};

    const [availability, setAvailability] = useState({});

    const fetchAvailability = async (spot) => {
        try {
            const proxyUrl = `http://localhost:4000/proxy?url=${encodeURIComponent(spot.url)}`;
            const { data } = await axios.get(proxyUrl);
            const $ = load(data);
            const isAvailable = $("img[src='/pics/ParkingIcons/panui.png']").length > 0;
            return isAvailable ? "פנוי" : "תפוס";
        } catch (error) {
            console.error(`Error fetching availability for ${spot.name}:`, error);
            return "שגיאה";
        }
    };

    useEffect(() => {
        const fetchAllAvailabilities = async () => {
            const availabilityPromises = parkingSpots.map(async (spot) => {
                const status = await fetchAvailability(spot);
                return { [spot.name]: status };
            });

            const results = await Promise.all(availabilityPromises);
            setAvailability(results.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
        };

        fetchAllAvailabilities();
    }, []);

    if (!userLat || !userLon) {
        return <p>לא ניתן לאחזר את המיקום שלך. אנא נסה שוב.</p>;
    }

    const sortedParkingSpots = parkingSpots
        .map((spot) => ({
            ...spot,
            distance: getDistance(
                { latitude: userLat, longitude: userLon },
                { latitude: spot.lat, longitude: spot.lon }
            ),
        }))
        .sort((a, b) => a.distance - b.distance);

    return (
        <div style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
                חניונים קרובים לכתובתך
            </h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {sortedParkingSpots.map((spot) => (
                    <div
                        key={spot.name}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor:
                                availability[spot.name] === "פנוי"
                                    ? "rgba(76, 175, 80, 0.2)" // Light green pastel
                                    : availability[spot.name] === "תפוס"
                                        ? "rgba(255, 82, 82, 0.2)" // Light red pastel
                                        : "white", // Default white
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        <h3 style={{marginBottom: "10px", color: "#333"}}>{spot.name}</h3>
                        <p style={{color: "#666", marginBottom: "10px"}}>{spot.address}</p>
                        <p style={{color: "#666", marginBottom: "10px"}}>
                            מרחק:{" "}
                            {spot.distance > 1000
                                ? `${(spot.distance / 1000).toFixed(1)} קילומטרים`
                                : `${spot.distance} מטרים`}
                        </p>
                        <p
                            style={{
                                color:
                                    availability[spot.name] === "פנוי"
                                        ? "#4CAF50"
                                        : availability[spot.name] === "תפוס"
                                            ? "#FF5252"
                                            : "#666",
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                            }}
                        >
                            סטטוס: {availability[spot.name] || "טוען..."}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parking;