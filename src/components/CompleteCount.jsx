import React, { useEffect, useState } from "react";

const CompleteCount = ({ todo }) => {
  const [completeCount, setCompleteCount] = useState([]);

  useEffect(() => {
    getComplete();
    console.log(todo);
  }, [todo]);

  const getComplete = () => {
    const completed = todo.filter((e) => {
      return e.completed === true;
    });
    console.log(completed);

    setCompleteCount([completed.length, todo.length]);
  };

  return (
    <div className="text-center text-white">
      <p>{`${completeCount[0]} completed out of ${todo.length}`}</p>
    </div>
  );
};

export default CompleteCount;
