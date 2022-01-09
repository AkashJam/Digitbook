import React, { useState } from "react";
import TodoForm from "./TodoForm";
// import { RiCloseCircleLine } from "react-icons/ri";
// import { TiEdit } from "react-icons/ti";
import { FaClock, FaTimesCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Calendar from "react-calendar";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, updateTodos }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [value, onChange] = useState(new Date());
  const [calender, setCalender] = useState(false);
  const toggle = () => {
    setCalender(!calender);
    console.log("toggle", calender, value);
  };
  console.log(value);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const handleChildElementClick = (e) => {
    e.stopPropagation()
 }

  function handleOnDragEnd(result) {
    console.log(result.destination);
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTodos(items);
    console.log(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="todos"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => {
                return (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.text}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={
                          todo.isComplete ? "todo-row complete" : "todo-row"
                        }
                        key={todo.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          key={todo.id}
                          onClick={() => completeTodo(todo.id)}
                        >
                          {todo.text}
                        </div>
                        <div className="icons">
                          <FaMapMarkerAlt className="pointer-icon" />
                          <FaClock onClick={toggle} className="clock-icon" />
                          <FaTimesCircle
                            onClick={() => removeTodo(todo.id)}
                            className="delete-icon"
                          />
                          <FaEdit
                            onClick={() =>
                              setEdit({ id: todo.id, value: todo.text })
                            }
                            className="edit-icon"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {calender && (
        <div className="calender" onClick={toggle}>
          <div onClick={(e) => handleChildElementClick(e)}>
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
