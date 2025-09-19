import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import MembersPage from "./pages/MembersPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BoardsPage from "./pages/BoardsPage";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/boards" element={<BoardsPage />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <p>Copyright 2025 It's me</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
