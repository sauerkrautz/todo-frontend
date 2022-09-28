import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Main from "./Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [crazy, setCrazy] = useState(false);
  const [user, setUser] = useState(null);

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodo(res.data.reverse());
    } catch (error) {
      console.log(error.message);
    }
  };

  const me = async () => {
    try {
      const res = await axios.get("http://localhost:5000/me");
      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    me();
    getTodos();
    // console.log(user);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login me={me} user={user} setUser={setUser} getTodos={getTodos} />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <Main
            me={me}
            getTodos={getTodos}
            todo={todo}
            setTodo={setTodo}
            user={user}
            setUser={setUser}
            crazy={crazy}
            setCrazy={setCrazy}
          />
        }
      />
    </Routes>
  );
}

export default App;
