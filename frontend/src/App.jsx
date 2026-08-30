import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import BundlePage from "./pages/BundlePage";
import Settings from "./pages/Settings";

import Profile from "./pages/Profile";
import Billing from "./pages/Billing";
import Preferences from "./pages/Preferences";
import Logout from "./pages/Logout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/bundle" element={<BundlePage />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

export default App;