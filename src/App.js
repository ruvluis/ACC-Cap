import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from "./components/Store";
import LoginSignup from "./components/LoginSignup"; // Import the LoginSignup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/checkout" element={<LoginSignup />} /> {/* Route for LoginSignup */}
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;



