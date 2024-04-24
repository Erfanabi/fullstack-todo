import axios from "axios";
import { useEffect, useState } from "react";
import { RiMastodonLine } from "react-icons/ri";
import Tasks from "../module/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("/api/todo");
    console.log(res.data.todos);
    if (res.data.status === "success") setTodos(res.data.todos);
  };

  const todo = todos.filter((item) => item.status === "todo");
  const review = todos.filter((item) => item.status === "review");
  const inProgress = todos.filter((item) => item.status === "inProgress");
  const done = todos.filter((item) => item.status === "done");

  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks data={todo} next="inProgress" />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks data={inProgress} back="todo" next="review" />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks data={review} back="inProgress" next="done" />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={done} back="review" />
      </div>
    </div>
  );
}

export default HomePage;
