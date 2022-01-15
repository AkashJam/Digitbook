import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Todo from "./pages/Todo";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
              <Link to="/login">Login</Link>
            </li> */}
          <li>
            <Link to="/todo">Todo</Link>
          </li>
        </ul>
        <Routes>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
