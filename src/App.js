import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter basename="/Ahuza">
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Add other routes here */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;