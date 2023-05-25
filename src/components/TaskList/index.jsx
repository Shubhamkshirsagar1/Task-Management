import React, { useEffect, useState } from "react";
import TaskCard from "../TaskCard";
import Header from "../Header";
import TaskForm from "../TaskForm";
import { toast } from "react-toastify";

const TaskList = () => {
  const [inputValue, setInputValue] = useState({
    heading: "",
    paragraph: "",
    list: "list1",
  });
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.log("TASKS Form-------", tasks);
  }, [tasks]);

  const handleSelectChange = (taskId, selectedList) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const previousList = task.list;
          if (previousList !== selectedList) {
            toast.success(
              `List type changed from ${previousList} to ${selectedList}`,
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
          }
          return {
            ...task,
            list: selectedList,
          };
        }
        return task;
      })
    );
  };

  return (
    <div>
      <Header />
      <TaskForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        tasks={tasks}
        setTasks={setTasks}
      />
      <TaskCard
        tasks={tasks}
        setTasks={setTasks}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default TaskList;
