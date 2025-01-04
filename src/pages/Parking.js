import React from "react";
import { useLocation } from "react-router-dom";
import { getDistance } from "geolib";

// Hebrew parking spot data
const parkingSpots = [
    {
        name: "חניון גולדה",
        address: "ברקוביץ 7, תל-אביב יפו, ישראל",
        lat: 32.0777617,
        lon: 34.7857548
    },
    {
        name: "חניון חברה חדשה",
        address: "חברה חדשה 9, תל-אביב יפו, ישראל",
        lat: 32.084745,
        lon: 34.790218
    },
    {
        name: "חניון מונטיפיורי",
        address: "מונטיפיורי 5, תל-אביב יפו, ישראל",
        lat: 32.0628,
        lon: 34.7725
    },
    {
        name: "חניון מפעל הפיס",
        address: "ליאונרדו דה וינצ'י 5, תל-אביב יפו, ישראל",
        lat: 32.0741,
        lon: 34.7822
    },
    {
        name: "חניון ספיר",
        address: "אליהו ספיר, תל-אביב יפו, ישראל",
        lat: 32.0853,
        lon: 34.7818
    },
    {
        name: "חניון קצה השדרה",
        address: "שדרות רוטשילד 1, תל-אביב יפו, ישראל",
        lat: 32.0643,
        lon: 34.7705
    },
    {
        name: "חניון תל-נורדאו",
        address: "פרישמן 28, תל-אביב יפו, ישראל",
        lat: 32.0805,
        lon: 34.7735
    }
];

const Parking = () => {
    const location = useLocation();
    const { lat: userLat, lon: userLon } = location.state || {};

    // If user location is missing, show an error
    if (!userLat || !userLon) {
        return <p>לא ניתן לאחזר את המיקום שלך. אנא נסה שוב.</p>;
    }

    // Calculate distances and sort parking spots
    const sortedParkingSpots = parkingSpots
        .map((spot) => ({
            ...spot,
            distance: getDistance(
                { latitude: userLat, longitude: userLon },
                { latitude: spot.lat, longitude: spot.lon }
            )
        }))
        .sort((a, b) => a.distance - b.distance); // Sort by distance (ascending)

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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parking;