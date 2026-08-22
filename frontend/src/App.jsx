import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Recovery from "./pages/Recovery";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;