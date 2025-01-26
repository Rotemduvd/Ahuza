import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "cheerio";
import { getDistance } from "geolib";
import parkingSpots from "../data/parkingSpots"; // Use the imported parkingSpots

const Parking = () => {
    const location = useLocation();
    const { lat: userLat, lon: userLon } = location.state || {};

    const [availability, setAvailability] = useState({});

    // Fetch parking availability
    const fetchAvailability = async (spot) => {
        try {
            // Use the proxy server
            const proxyUrl = `http://localhost:4000/proxy?url=${encodeURIComponent(spot.url)}`;
            const { data } = await axios.get(proxyUrl);

            // Parse the fetched HTML
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
            )
        }))
        .sort((a, b) => a.distance - b.distance);

    return (
        <div style={{ padding: "20px" }}>
            <h2>חניונים קרובים</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                {sortedParkingSpots.map((spot) => (
                    <div
                        key={spot.name}
                        style={{
                            border: "1px solid gray",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                        }}
                    >
                        <h3>{spot.name}</h3>
                        <p>{spot.address}</p>
                        <p>מרחק: {spot.distance > 1000
                            ? `${(spot.distance / 1000).toFixed(1)} קילומטרים`
                            : `${spot.distance} מטרים`}
                        </p>
                        <p>סטטוס: {availability[spot.name] || "טוען..."}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parking;