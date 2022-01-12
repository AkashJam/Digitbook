import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Scrollbars } from "react-custom-scrollbars";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [scrollStyle, setScrollStyle] = useState({
    height: viewHeight,
    width: "unset",
  });

  useEffect(() => {
    let list = document.querySelector('.list');
    var listHeight = list.offsetHeight;
    const maxHeight = window.innerHeight / 2;
    var temp = listHeight < maxHeight ? listHeight : maxHeight;
    setViewHeight(temp);
  }, [todos]);

  useEffect(() => {
    setScrollStyle({
      height: viewHeight,
      width: "unset",
    });
  }, [viewHeight]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    console.log(todo)
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodos = (todos) => {
    setTodos(todos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    // if (!newValue.text || /^\s*$/.test(newValue.text)) {
    //   return;
    // }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Scrollbars className="scroll" style={scrollStyle}>
        <div className="list">
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            updateTodos={updateTodos}
          />
        </div>
      </Scrollbars>
    </>
  );
}

export default TodoList;
