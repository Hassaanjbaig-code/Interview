import "./App.css"
import TopNavbar from "./components/TopNavbar";
import Navbar from './components/Navbar'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NoFound";
import Organizations from "./pages/Organizations";

function App() {
  return (
    <BrowserRouter>
      <TopNavbar />
      <div className="flex">
        <Navbar />
        <div className="container mx-auto bg-[#e5e7eb]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App