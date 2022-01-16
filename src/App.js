import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
