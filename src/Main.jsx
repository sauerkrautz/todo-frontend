import axios from "axios";
import Form from "./components/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TodoList from "./components/TodoList";
import { TailSpin } from "react-loader-spinner";

function Main({ me, getTodos, todo, setTodo, crazy, setCrazy, user, setUser }) {
  useEffect(() => {
    getTodos();
    me();
    setTodo(todo.reverse());
    return () => {
      me();
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const memoTodo = useMemo(() => {
    return todo;
  }, [todo]);

  const addTodo = async (todos) => {
    try {
      await axios.post("http://localhost:5000/todos", todos);
      await getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      await getTodos();
    } catch (error) {
      console.log(error.message);
    }
  };

  const completeTask = async (id) => {
    try {
      const todo = await axios.get(`http://localhost:5000/todos/${id}`);
      const completed = todo.data.completed;
      if (completed === false) {
        await axios.patch(`http://localhost:5000/todos/${id}`, {
          completed: true,
        });
      } else if (completed === true) {
        await axios.patch(`http://localhost:5000/todos/${id}`, {
          completed: false,
        });
      }
      await getTodos();
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTodo = async (id, input) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, { text: input });
      await getTodos();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setUser("");
      setTodo([]);
      await axios.delete("http://localhost:5000/logout");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-8 bg-secback text-center">
      <div
        className="w-full h-screen fixed bg-secmain"
        style={{ zIndex: isLoading ? 10 : -10 }}
      ></div>
      <div
        className="w-full h-screen fixed opacity-50 bg-secmain flex justify-center items-center"
        style={{ zIndex: isLoading ? 20 : -10 }}
      >
        {isLoading ? (
          <TailSpin
            height="300"
            width="300"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex justify-between px-8 pt-4">
        <div className="text-white">{user ? user.name : ""}</div>
        <div>
          <button
            className="px-4 py-2 bg-secmain text-red-600 shadow-lg"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </div>
      <Form
        todo={memoTodo}
        setTodo={setTodo}
        addTodo={addTodo}
        crazy={crazy}
        setCrazy={setCrazy}
        user={user}
      />
      <TodoList
        todo={memoTodo}
        setTodo={setTodo}
        removeTodo={removeTodo}
        completeTask={completeTask}
        editTodo={editTodo}
        crazy={crazy}
        setCrazy={setCrazy}
      />
    </div>
  );
}

export default Main;
