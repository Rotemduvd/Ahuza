import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Parking from "./pages/Parking";

function App() {
    return (
        <BrowserRouter basename="/Ahuza">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/parking" element={<Parking />} />
                {/* Add other routes here */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;