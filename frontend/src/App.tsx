import "./App.css"
import TopNavbar from "./components/TopNavbar";
import Navbar from './components/Navbar'

function App() {
  return (
    <main className="h-screen">
      <TopNavbar />
      <div className="flex">
        <Navbar/>
      </div>
    </main>
  )
}
export default App