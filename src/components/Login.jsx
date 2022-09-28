import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

const Login = ({ me, user, setUser, getTodos }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setUser(response.data);
      if (response) return await getTodos();
    } catch (error) {
      console.log(error);
      setErr(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) return me();
  }, []);

  if (user) return navigate("/home");

  const bgColor = "rgb(220 38 38, 0.5)";

  return (
    <div className="w-full h-screen flex justify-center items-center bg-secback">
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
      <div className="w-full flex flex-col gap-4 items-center">
        <div
          className="rounded-md p-4 w-1/4"
          style={{ backgroundColor: err ? "#202020" : "transparent" }}
        >
          <div className="text-red-600 tracking-wide text-lg shadow-lg text-center w-full">
            {err ? err : ""}
          </div>
        </div>
        <form
          className="w-3/4 flex flex-col gap-8 items-center"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-2/4 rounded-lg p-4"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-2/4 rounded-lg p-4"
          />
          <button
            type="submit"
            className="bg-teal-500 px-4 py-4 w-2/4 rounded-lg"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
          <div className="w-6/12 flex ml-1">
            <Link to="/register" className="text-teal-500 opacity-80">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
