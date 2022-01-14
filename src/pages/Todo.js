import React from "react";
import TodoList from "../components/TodoList";

function Home() {
  return (
    <>
      <div className="todo-app">
        <div className="grad-bord">
          <div className="back">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
