import React, { useEffect, useState } from "react";
import TodoList from "../components/Todo/TodoList";
import Creatable, { useCreatable } from "react-select/creatable";

function TodoPage() {
  const groups = [
    { value: "supermarket", label: "Supermarket" },
    { value: "atm", label: "ATM" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "custom", label: "Custom" },
  ];
  const [options, setOptions] = useState(groups);
  const [selectGroup, setSelectGroup] = useState("");
  const [group, setGroup] = useState("");

  //Needs API request and async load for new group
  const newGroup = (e) => {
    const newOption = { value: e, label: e };
    const newOptions = [...options, newOption];
    setOptions(newOptions);
    setSelectGroup({ value: e, label: e });
  };

  useEffect(() => {
    setGroup(selectGroup.value);
  }, [selectGroup]);

  return (
    <>
      <div className="todo-app">
        <div className="group-menu">
          <h1 className="head">Groups</h1>
          <Creatable
            options={options}
            value={selectGroup}
            onChange={setSelectGroup}
            onCreateOption={newGroup}
            placeholder="Select or type name of new group"
          />
        </div>
        <div className="grad-bord">
          <div className="back">
            {group && <h1 className="group-title">{selectGroup.label}</h1>}
            <div className="group-menu-mob">
              <Creatable
                options={options}
                value={selectGroup}
                onChange={setSelectGroup}
                onCreateOption={newGroup}
                placeholder="Select or type name of new group"
              />
            </div>
            {group && <TodoList group={group} />}
          </div>
        </div>
      </div>
    </>
  );
}
export default TodoPage;
