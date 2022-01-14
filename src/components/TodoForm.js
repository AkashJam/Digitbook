import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { FaPlus } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const [toggle, setToggle] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (toggle) {
      inputRef.current.focus();
    }
  });

  const toggling = () => {
    setToggle(!toggle);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var idgen = Math.floor(Math.random() * 10000).toString();
    props.onSubmit({
      id: idgen,
      text: input,
      date: null,
      location: null,
    });

    if(inputRef.current.value){
        // console.log(inputRef.current.value)
        if(props.edit){
            toast.success("Task updated", {
                theme: "colored",
                hideProgressBar: true,
                transition: Flip,
              });
        } else {
            toast.success("Task added", {
              theme: "colored",
              hideProgressBar: true,
              transition: Flip,
            });
        }
    }

    if(!props.edit) {
        toggling();
    }

    setInput("");
  };

  return (
    <div className="todo-form">
      {!toggle && !props.edit && <FaPlus className="add-icon" onClick={toggling} />}
      <form onSubmit={handleSubmit}>
        {props.edit ? (
          <>
            <input
              placeholder="Update your item"
              value={input}
              onChange={handleChange}
              name="text"
              ref={inputRef}
              className="todo-input edit"
            />
            <button onClick={handleSubmit} className="todo-button edit">
              Update
            </button>
          </>
        ) : (
          <>
            {toggle && (
              <div className="add-task">
                <input
                  placeholder="Add a todo"
                  value={input}
                  onChange={handleChange}
                  name="text"
                  className="todo-input"
                  ref={inputRef}
                />
                <button onClick={handleSubmit} className="todo-button">
                  Add todo
                </button>
              </div>
            )}
          </>
        )}
        <ToastContainer />
      </form>
    </div>
  );
}

export default TodoForm;
