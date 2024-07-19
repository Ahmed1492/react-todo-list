import "./todoList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
export default function TodoList() {
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setnewTask] = useState([]);
  const [isUpdateData, setIsUpatedata] = useState(false);
  const [updatedStatusObject, setUpdatedStatusObject] = useState({});
  const [url, setUrl] = useState("http://localhost:4000/allTasks");

  const getAllTasks = async () => {
    try {
      let myResponse = await axios.get(url);
      setAllTasks(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addNewTask = async () => {
    try {
      let myResponse = await axios.post(
        "http://localhost:4000/allTasks",
        newTask
      );
      setIsUpatedata(!isUpdateData);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      let myResponse = await axios.delete(
        `http://localhost:4000/allTasks/${id}`
      );
      setIsUpatedata(!isUpdateData);

      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusOfTask = async (id, newStatus) => {
    try {
      let myResponse = await axios.patch(
        `http://localhost:4000/allTasks/${id}`,
        newStatus
      );
      setIsUpatedata(!isUpdateData);

      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const filterToAllTasks = () => {
    setUrl("http://localhost:4000/allTasks");
    setIsUpatedata(!isUpdateData);
  };
  const filterToCompletedTasks = () => {
    setUrl("http://localhost:4000/allTasks?isCompleted=true");
    setIsUpatedata(!isUpdateData);
  };
  const filterToNonTasks = () => {
    setUrl("http://localhost:4000/allTasks?isCompleted=false");
    setIsUpatedata(!isUpdateData);
  };

  const changeIsCompleteStatue = async (singleTask) => {
    let newObj = { ...singleTask };
    newObj.isCompleted = !newObj.isCompleted;
    setUpdatedStatusObject(newObj);
    console.log(newObj.isCompleted);

    await changeStatusOfTask(singleTask.id, newObj);
    setIsUpatedata(!isUpdateData);
  };
  useEffect(() => {
    getAllTasks();
    console.log("das");
  }, [isUpdateData]);
  return (
    <div className="myTodoList">
      <div className="todoListContainer">
        <div className="todoListHeader">
          <h2>Get Things Done !</h2>
          <div className="todoInputandbtn">
            <input
              onChange={(e) =>
                setnewTask({
                  id: `${Math.random()}`,
                  taskName: e.target.value,
                  isCompleted: "false",
                })
              }
              placeholder="What is the task Today ?"
              type="text"
            />
            <button onClick={addNewTask}>Add Task</button>
          </div>
          <div className="filter">
            <button onClick={filterToAllTasks}>All</button>
            <button onClick={filterToNonTasks}>Not Completed</button>
            <button onClick={filterToCompletedTasks}>Completed</button>
          </div>
        </div>
        <div className="todoListBody">
          {allTasks?.length != 0 ? (
            <div className="allTasks">
              {allTasks?.map((singleTask, index) =>
                singleTask.isCompleted === true ? (
                  <del
                    key={index}
                    className={`singleTask ${
                      singleTask.isCompleted === true ? "taskIsCompleted" : ""
                    }`}
                  >
                    <p
                      onClick={() => changeIsCompleteStatue(singleTask)}
                      className="task"
                    >
                      {singleTask?.taskName}
                    </p>
                    <div className="icons">
                      <EditIcon />
                      <DeleteIcon onClick={() => deleteTask(singleTask?.id)} />
                    </div>
                  </del>
                ) : (
                  <div key={index} className="singleTask">
                    <p
                      onClick={() => changeIsCompleteStatue(singleTask)}
                      className="task"
                    >
                      {singleTask?.taskName}
                    </p>
                    <div className="icons">
                      <EditIcon />
                      <DeleteIcon onClick={() => deleteTask(singleTask?.id)} />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="emptyBox">
              <h2>No Tasks To Show</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
