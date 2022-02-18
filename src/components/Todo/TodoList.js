import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Scrollbars } from "react-custom-scrollbars";
import "./Todo.css";

const TodoList = ({ group }) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(tasks);
  const [todos, setTodos] = useState([]); //Get tasks from API based on group
  // const [todosGroup, setTodosGroup] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [scrollStyle, setScrollStyle] = useState({
    height: viewHeight,
    width: "unset",
  });

  // useEffect(() => {
  //   const newTodos = [...todos].filter((todo) => todo.group === group);
  //   setTodosGroup(newTodos);
  // }, [todos, group]);

  useEffect(() => {
    const list = document.querySelector(".list");
    //console.log(list.offsetHeight);
    setViewHeight(list.offsetHeight);
  }, [todos]);
  // }, [todosGroup]);

  useEffect(() => {
    setScrollStyle({
      height: viewHeight,
      width: "unset",
    });
  }, [viewHeight]);

  //Need API request to add new task
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // console.log(todo)
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    localStorage.setItem("tasks", JSON.stringify(newTodos));
  };

  //Need API request to update task position
  const updateTodos = (todos) => {
    setTodos(todos);
    // setTodosGroup(todos);
    console.log(...todos);
  };

  //Need API request for updating task
  const updateTodo = (todoId, newValue) => {
    // if (!newValue.text || /^\s*$/.test(newValue.text)) {
    //   return;
    // }
    console.log(newValue);
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //Need API request to update task status to deleted
  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    // let updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.isComplete = !todo.isComplete;
    //   }
    //   return todo;
    // });
    // setTodos(updatedTodos);
    let updatedTodo = todos.filter((todo) => todo.id === id);
    updatedTodo = updatedTodo[0];
    updatedTodo.isComplete = !updatedTodo.isComplete;
    updateTodo(updatedTodo.id, updatedTodo);
  };

  return (
    <>
      <TodoForm group={group} onSubmit={addTodo} />
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
};

export default TodoList;
