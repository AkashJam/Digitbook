import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
import Maps from "../Modal/Map";
import Calendar from "../Modal/Calendar";

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
    // console.log(result.destination);
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTodos(items);
  }

  // Map
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

  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(false);
  const toggleMap = (value) => {
    setMap(!map);
    if (map) {
      value = edit.value;
      if (value.location !== location) {
        value.location = location;
        updateTodo(value.id, value);
      }
      setEdit({
        is: false,
        id: null,
        value: "",
      });
    } else {
      if (value) {
        if (value.value.location) {
          setLocation(value.value.location);
        } else {
          setLocation(null);
        }
        setEdit({
          is: false,
          id: value.value.id,
          value: value.value,
        });
      }
    }
  };

  // Calender
  const [calenderDate, setCalenderDate] = useState(null);
  const [calender, setCalender] = useState(false);
  const toggleCalender = (value) => {
    setCalender(!calender);
    if (calender) {
      value = edit.value;
      if (
        calenderDate &&
        (value.date === null ||
          value.date.toDateString() !== calenderDate.toDateString())
      ) {
        value.date = new Date(calenderDate);
        updateTodo(value.id, value);
      }
      setEdit({
        is: false,
        id: null,
        value: "",
      });
    } else {
      if (value) {
        if (value.value.date) {
          setCalenderDate(new Date(value.value.date));
        } else {
          setCalenderDate(null);
        }
        setEdit({
          is: false,
          id: value.value.id,
          value: value.value,
        });
      }
    }
  };

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
                            key={todo.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task
                              todo={todo}
                              completeTodo={completeTodo}
                              removeTodo={removeTodo}
                              setEdit={setEdit}
                              toggleCalender={toggleCalender}
                              toggleMap={toggleMap}
                            />
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
      {map && (
        <Maps
          location={location}
          setLocation={setLocation}
          toggleMap={toggleMap}
          handleChildElementClick={handleChildElementClick}
        />
      )}
      {calender && (
        <Calendar
          calenderDate={calenderDate}
          setCalenderDate={setCalenderDate}
          toggleCalender={toggleCalender}
          handleChildElementClick={handleChildElementClick}
        />
      )}
    </div>
  );
};

export default Todo;
