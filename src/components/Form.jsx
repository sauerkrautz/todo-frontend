import React, { useState, useEffect, useRef } from "react";
import CompleteCount from "./CompleteCount";

const Form = ({ todo, addTodo, crazy, setCrazy, user }) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    return setInput(e.target.value);
  };

  const crazyToggle = () => {
    if (crazy === true) {
      setCrazy(false);
    } else {
      setCrazy(true);
    }
  };

  const INPUT = useRef();

  useEffect(() => {
    INPUT.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todos = {
      text: input,
    };

    if (/[\S\s]+[\S]+/.test(input)) {
      addTodo(todos);
    }

    console.log(todo);
    setInput("");
  };

  return (
    <div
      className=" w-full flex  justify-center items-center"
      onDoubleClick={crazyToggle}
    >
      <form
        onSubmit={handleSubmit}
        className=" w-1/2 md:w-[35%] flex flex-col justify-center items-center gap-4 mt-20 pb-4"
      >
        {/* <div className="w-full py-4 px-2 bg-secmain text-white shadow-lg rounded-lg">
          Hello, {user ? user.name : ""}! What will you do today?
        </div> */}
        <CompleteCount todo={todo} />
        <input
          type="text"
          value={input}
          ref={INPUT}
          onChange={handleInput}
          placeholder="add todo"
          className="w-full md:w-3/4 rounded-lg p-2 focus:scale-105 transition-transform"
        />
      </form>
    </div>
  );
};

export default Form;
