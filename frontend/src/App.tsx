import "./App.css"
import TopNavbar from "./components/TopNavbar";
import Navbar from './components/Navbar'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NoFound";
import Organizations from "./pages/Organizations";
import OrganizationEditPage from "./pages/OrganizationEditPage"
import ContactEditPages from "./pages/ContactEditPages";

function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <div className="flex min-h-screen">
        <Navbar />
        <div className="flex-1 w-full bg-[#e5e7eb] md:p-6 p-1.5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/organizations/:id/edit" element={<OrganizationEditPage />} />
            <Route path="/contact/:id/edit" element={<ContactEditPages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App