import React, { useEffect } from "react";
import "./styles.css";
import { toast } from "react-toastify";

const TaskForm = ({ inputValue, setInputValue, tasks, setTasks }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (inputValue.heading !== "" && inputValue.paragraph !== "") {
      const newTodo = {
        id: new Date().getTime(),
        heading: inputValue.heading,
        paragraph: inputValue.paragraph,
        list: inputValue.list,
      };

      setTasks([...tasks, newTodo]);
      setInputValue({
        heading: "",
        paragraph: "",
        list: "list1",
      });
    } else {
      toast.error("Input Can't be Empty!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  
  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <input
        className="heading-input"
        type="text"
        placeholder="Task Heading..."
        value={inputValue.heading}
        onChange={(e) =>
          setInputValue({ ...inputValue, heading: e.target.value })
        }
      />
      <input
        className="description-input"
        type="text"
        placeholder="Task Description..."
        value={inputValue.paragraph}
        onChange={(e) =>
          setInputValue({ ...inputValue, paragraph: e.target.value })
        }
      />
      <select
        className="select-input"
        name="lists"
        id="lists"
        value={inputValue.list}
        onChange={(e) => setInputValue({ ...inputValue, list: e.target.value })}
      >
        <option value="list1">Task List 1</option>
        <option value="list2">Task List 2</option>
        <option value="list3">Task List 3</option>
      </select>
      <button type="submit" className="form-button">
        +Add
      </button>
    </form>
  );
};

export default TaskForm;
