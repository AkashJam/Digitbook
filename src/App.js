import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="todo-app">
      <div className="grad-bord">
        <div className="back">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
