import React, { useRef } from "react";
import { useEffect } from "react";

const Input = ({ handleEdit, handleInput, input, text, setInput }) => {
  const inputField = useRef(null);
  useEffect(() => {
    inputField.current.focus();
    setInput(text);
  }, []);
  return (
    <form className="w-full h-full" onSubmit={handleEdit}>
      <input
        type="text"
        className="w-full h-full bg-transparent rounded-xl text-white px-2"
        onChange={handleInput}
        value={input}
        ref={inputField}
      />
    </form>
  );
};

export default Input;
