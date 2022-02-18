import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header/Header";

function App() {
  // console.log(window.location.pathname);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/todo" element={<TodoPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/*" element={<Navigate replace to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
