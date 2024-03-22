import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const createTodo = async () => {
    const API = "http://localhost:3002/api/newtodo";
    if (!title) {
      alert("Please enter title");
      return;
    }

    const { data } = await axios.post(API, { title });
    setTitle("");
    alert("Created todo successfully");
    console.log("api call", data);
    fetchAllTodos();
  };

  const fetchAllTodos = async () => {
    const API = "http://localhost:3002/api/alltodos";

    const { data } = await axios.get(API);
    console.log("get api", data);
    if (data) {
      setList(data?.allTodos);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <>
      <section className="main">
        <div className="upper">
          <input
            type="text"
            value={title}
            placeholder="enter text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createTodo}>Add</button>
        </div>
        <div className="lower">
          <div className="list">
            {list && list.map((e, i) => <span key={i}>{e.title}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
