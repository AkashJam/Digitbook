import React, { useEffect, useState, useRef, useMemo } from "react";
import TodoForm from "./TodoForm";
import { FaClock, FaTimesCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Calendar from "react-calendar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo, updateTodos }) => {
  //Edit
  const [edit, setEdit] = useState({
    is: false,
    id: null,
    value: "",
  });
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      is: false,
      id: null,
      value: "",
    });
  };

  function handleOnDragEnd(result) {
    console.log(result.destination);
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTodos(items);
  }

  //Map
  const center = {
    lat: 51.505,
    lng: -0.09,
  };
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const [map, setMap] = useState(false);
  const toggleMap = (value) => {
    setMap(!map);
    if (map) {
      value = edit;
      value.value.location = position;
      console.log(value.value)
      updateTodo(value.value.id, value.value);
      setEdit({
        is: false,
        id: null,
        value: "",
      });
    } else {
      if (value) {
        if (value.value.location) {
          setPosition(value.value.location);
        }
        setEdit({
          is: false,
          id: value.value.id,
          value: value.value,
        });
      }
    }

    // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    // if (!map) {
    //   axios
    //     .get(
    //       `http://www.overpass-api.de/api/interpreter?data=[out:json];node
    //       ["amenity"="atm"]
    //       (41.884387437208,12.480683326721,41.898699521063,12.503321170807);
    //       out;`
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //     });
    // }
  };
  

  //Calender
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [calender, setCalender] = useState(false);
  const [date, setDate] = useState(null);
  const toggleCalender = (value) => {
    setCalender(!calender);
    if (calender) {
      value = edit;
      value.value.date = new Date(calenderDate);
      updateTodo(value.value.id, value.value);
      setEdit({
        is: false,
        id: null,
        value: "",
      });
    } else {
      if (value) {
        if (value.value.date) {
          setCalenderDate(new Date(value.value.date));
        }
        setEdit({
          is: false,
          id: value.value.id,
          value: value.value,
        });
      }
    }
  };

  function onChange(nextValue) {
    setCalenderDate(nextValue);
  }

  useEffect(() => {
    setDate(calenderDate.toDateString());
  }, [calenderDate]);

  const handleChildElementClick = (e) => {
    e.stopPropagation();
  };

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
                    {edit.is && todo.id === edit.id ? (
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
                                onClick={() => toggleMap({ value: todo })}
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
                                  setEdit({
                                    is: true,
                                    id: todo.id,
                                    value: todo.text,
                                  })
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
            <MapContainer
              style={{ width: "70vh", height: "50vh" }}
              center={position}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
              >
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
