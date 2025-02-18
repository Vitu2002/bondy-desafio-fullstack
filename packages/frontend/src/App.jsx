import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GreetingPage } from "./pages/Greeting";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/greeting" element={<GreetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
