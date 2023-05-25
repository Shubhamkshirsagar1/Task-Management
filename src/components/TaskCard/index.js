import React, { useState, useEffect } from "react";
import "./styles.css";
import { Tooltip } from "@mui/material";

export default function TaskCard({
  tasks,
  setTasks,
  isEdit,
  setIsEdit,
  handleSelectChange,
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [editedParagraph, setEditedParagraph] = useState("");
  const [selectedList, setSelectedList] = useState("all");

  const handleTaskDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task) => {
    setIsEdit(true);
    setEditingTask(task);
    setEditedHeading(task.heading);
    setEditedParagraph(task.paragraph);
  };

  const handleSaveClick = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === editingTask.id) {
          return {
            ...task,
            heading: editedHeading,
            paragraph: editedParagraph,
          };
        }
        return task;
      })
    );

    setIsEdit(false);
    setEditingTask(null);
    setEditedHeading("");
    setEditedParagraph("");
  };

  const handleListFilter = (e) => {
    setSelectedList(e.target.value);
  };

  const filteredTasks =selectedList === "all" ? tasks : tasks.filter((task) => task.list === selectedList);

  useEffect(() => {
    console.log("Task Card-----------", tasks);
    console.log(isEdit);
  }, [tasks, isEdit]);

  return (
    <div>
      <div className="filter-by-list">
        <label>Filter by Lists:- </label>
        <select
          value={selectedList}
          onChange={handleListFilter}
          className="filtered-lists-task"
        >
          <option value="all">All</option>
          <option value="list1">Task List 1</option>
          <option value="list2">Task List 2</option>
          <option value="list3">Task List 3</option>
        </select>
      </div>
      <div className="card-container">
        {filteredTasks.map((task) => {
          const isEditing = isEdit && editingTask && editingTask.id === task.id;
          return (
            <div className="card" key={task.id}>
              <div className="card-content">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="card-input"
                      value={editedHeading}
                      onChange={(e) => setEditedHeading(e.target.value)}
                    />
                    <textarea
                      rows={5}
                      cols={50}
                      type="text"
                      className="card-input"
                      value={editedParagraph}
                      onChange={(e) => setEditedParagraph(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="card-heading">{task.heading}</h3>
                    <p className="card-paragraph">{task.paragraph}</p>
                  </>
                )}
              </div>
              <div className="card-buttons">
                {isEditing ? (
                  <button
                    className="taskcard-button save-button"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="taskcard-button edit-button"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="taskcard-button delete-button"
                  onClick={() => handleTaskDelete(task.id)}
                >
                  Delete
                </button>
                <Tooltip title="Move Card to Another List">
                  <select
                    name="lists"
                    id="lists"
                    value={task.list}
                    onChange={(e) =>
                      handleSelectChange(task.id, e.target.value)
                    }
                    className="taskcard-list"
                  >
                    <option value="list1">Task List 1</option>
                    <option value="list2">Task List 2</option>
                    <option value="list3">Task List 3</option>
                  </select>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
