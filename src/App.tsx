// Import Libraries
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';

// Import Components
import Artwork from './Artwork';
import Favorites from './Favorites';
import Featured from './Featured';
import Gallery from './Gallery';
import Footer from './Footer';

// Import CSS
import './styles/App.css'

// Dynamic Styles
const navLinkStyles = ({ isActive } : { isActive:Boolean }) => ({
  color: isActive ? '#222' : '#eee',
  backgroundColor: isActive ? '#999' : '#222',
  fontWeight: isActive ? 300 : 200
});

// Constructor
export default function App() {
  // Renderer
  return (
    <BrowserRouter>
      <header>
        <nav>
          <NavLink data-testid="navlink" to="/" style={navLinkStyles}>Featured</NavLink> |{" "}
          <NavLink data-testid="navlink" to="/gallery" style={navLinkStyles}>Gallery</NavLink> |{" "}
          <NavLink data-testid="navlink" to="/favorites" style={navLinkStyles}>Favorites</NavLink>
        </nav>
        <h1>Art Institute of Chicago</h1>
      </header>
      <Routes>
        <Route path="/" element={<Featured />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/artwork/:artworkId" element={<Artwork />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </BrowserRouter>
  )
}