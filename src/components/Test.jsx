import React, { useEffect, useRef, useState } from "react";

const Test = () => {
  const [value, setValue] = useState("");
  const test = useRef();

  useEffect(() => {
    // test.onChange(() => {
    //   return setValue(test.current.textContent);
    // });
    console.log(test.current);
  }, []);

  const handleChange = () => {
    const texts = test.current.textContent;
    console.log(value);
    return setValue(texts);
  };

  return (
    <div className="relative min-h-screen w-full bg-orange-500 flex justify-center items-center">
      {value}
      <div
        className="absolute w-2/5 h-2/5 bg-white"
        contentEditable="true"
        onChange={handleChange}
        ref={test}
      >
        sometigas;dkjfaslkdfj a;sdfkj
      </div>
    </div>
  );
};

export default Test;
