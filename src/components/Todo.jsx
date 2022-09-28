import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useVelocity } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Input from "./subcomponents/Input";
import Display from "./subcomponents/Display";

const Todo = ({
  text,
  id,
  completeStatus,
  date,
  completeTask,
  removeTodo,
  editTodo,
  crazy,
  setCrazy,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useEffect(() => {
    console.log(velocity.current);
  }, []);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const toggleEdit = () => {
    if (isEditing === true) {
      setIsEditing(false);
    } else if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const handleRemove = () => {
    removeTodo(id);
  };

  const handleComplete = () => {
    completeTask(id);
  };

  const handleInput = (e) => {
    let text = e.target.value;
    setInput(text);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editTodo(id, input);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 100 }}
      key={id}
      className="relative bg-secmain w-full min-h-[10rem] p-2 text-md rounded-lg flex flex-col gap-4 justify-between items-baseline transition-colors duration-200 "
      style={{
        backgroundColor: completeStatus
          ? "green"
          : crazy
          ? getRandomColor()
          : "#202020",
      }}
      onDoubleClick={handleComplete}
    >
      {/* <p
        className="break-words text-left"
        style={{ color: completeStatus ? "white" : "white" }}
      >
        {text}
      </p> */}
      {isEditing ? (
        <Input
          handleEdit={handleEdit}
          handleInput={handleInput}
          text={text}
          input={input}
          setInput={setInput}
          isEditing={isEditing}
        />
      ) : (
        <Display text={text} completeStatus={completeStatus} />
      )}
      <div className="w-full flex justify-between items-center">
        <div
          className="text-gray-500 text-[.7rem]"
          style={{ color: completeStatus ? "white" : "rgb(107 114 128" }}
        >
          {date}
        </div>

        <div className="flex gap-2 md:gap-4">
          <button
            className="text-red-500 tracking-wider p-1 rounded-lg text-md font-poppins font-bold"
            onClick={handleRemove}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="text-white opacity-70 tracking-wider p-1 rounded-lg text-md font-poppins font-bold"
            onClick={toggleEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Todo;
