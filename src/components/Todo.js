import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { FaClock, FaTimesCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Calendar from "react-calendar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, updateTodos }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const position = [51.505, -0.09];
  const [map, setMap] = useState(false);
  const toggleMap = () => {
    setMap(!map);
  }

  const [calenderDate, onChange] = useState(new Date());
  const [calender, setCalender] = useState(false);
  const [date, setDate] = useState(null);
  const toggleCalender = (value) => {
    setCalender(!calender);
    if (calender) {
      if (value) {
        if (value.value.date) {
          setDate(value.value.date);
        }
      }
    } else {
      console.log(typeof value, value.value.date);
      value.value.date = calenderDate;
      console.log(value.value.id);
      updateTodo(value.value.id, value.value);
    }
  };

  useEffect(() => {
    var temp = calenderDate.toString().split(" ");
    var str = "";
    for (let index = 0; index < 4; index++) {
      if (index === 3) {
        str = str.concat(temp[index]);
      } else {
        str = str.concat(temp[index], " ");
      }
    }
    setDate(str);
  }, [calenderDate]);

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    console.log(value);
    setEdit({
      id: null,
      value: "",
    });
  };

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }

  const handleChildElementClick = (e) => {
    e.stopPropagation();
  };

  function handleOnDragEnd(result) {
    console.log(result.destination);
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTodos(items);
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
                  <div>
                    {edit.id && todo.id === edit.id ? (
                      <Draggable
                      key={todo.id}
                      draggableId={todo.text}
                      index={index}
                    >
                      {(provided) => (
                        <div
                        key={todo.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                      <TodoForm edit={edit} onSubmit={submitUpdate} />
                      </div>
                      )}
                      </Draggable>
                    ) : (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
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
                              <FaMapMarkerAlt
                                onClick={toggleMap}
                                className="pointer-icon"
                              />
                              <FaClock
                                onClick={() => toggleCalender({ value: todo })}
                                className="clock-icon"
                              />
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
                    )}
                  </div>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {calender && (
        <div className="calender" onClick={toggleCalender}>
          <div className="modal" onClick={(e) => handleChildElementClick(e)}>
            <Calendar onChange={onChange} value={calenderDate} />
            <h1>{date}</h1>
          </div>
        </div>
      )}
      {map && (
        <div className="calender" onClick={toggleMap}>
          <div className="modal" onClick={(e) => handleChildElementClick(e)}>
            <MapContainer style={{ width: "70vh", height: "50vh" }} center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
