import React from "react";
import { useLocation } from "react-router-dom";
import { getDistance } from "geolib";
import parkingSpots from "../data/parkingSpots";

const Parking = () => {
    const location = useLocation();
    const { lat: userLat, lon: userLon } = location.state || {};

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
            <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
                חניונים קרובים לכתובתך
            </h2>
            <p style={{textAlign: "center",color: "#dc8125",marginBottom: "20px", }}>לחץ לפרטי תפוסה</p>
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
                            border: "3px solid #ddd",
                            borderColor: "#dc8125",
                            borderRadius: "12px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: "white",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                        }}
                        onClick={() => window.open(spot.url, "_blank")} // Open URL in a new tab
                    >
                        <h3 style={{ marginBottom: "10px", color: "#333" }}>{spot.name}</h3>
                        <p style={{ color: "#666", marginBottom: "10px" }}>{spot.address}</p>
                        <p style={{ color: "#666", marginBottom: "10px" }}>
                            מרחק:{" "}
                            {spot.distance > 1000
                                ? `${(spot.distance / 1000).toFixed(1)} קילומטרים`
                                : `${spot.distance} מטרים`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parking;