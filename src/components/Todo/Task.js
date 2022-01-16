import React from "react";
import { FaClock, FaTimesCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const Task = ({
  todo,
  completeTodo,
  removeTodo,
  toggleMap,
  setEdit,
  toggleCalender,
}) => {

  return (
      <div className={todo.isComplete ? "todo-row complete" : "todo-row"}>
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
        <div className="icons">
          <FaMapMarkerAlt
            onClick={() => toggleMap({ value: todo })}
            className={todo.location ? "pointer-icon" : "pointer-icon dull"}
          />
          <FaClock
            onClick={() => toggleCalender({ value: todo })}
            className={todo.date ? "clock-icon" : "clock-icon dull"}
          />
          <FaTimesCircle
            onClick={() => removeTodo(todo.id)}
            className="delete-icon"
          />
          <FaEdit
            onClick={() =>
              setEdit({
                is: true,
                id: todo.id,
                value: todo,
              })
            }
            className="edit-icon"
          />
        </div>
      </div>
  );
};

export default Task;
