import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErr(null);
      const res = await axios.post("http://localhost:5000/users", {
        name,
        email: email,
        password: password,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (user && !err) return navigate("/");

  const bgColor = "rgb(220 38 38, 0.5)";

  return (
    <div className="w-full h-screen flex justify-center items-center bg-secback flex-col gap-4 ">
      <div
        className="rounded-md p-4 w-5/12  text-red-600 shadow-lg text-center"
        style={{ backgroundColor: err ? "#202020" : "transparent" }}
      >
        {err ? err : ""}
      </div>
      <form
        className="w-3/4 flex flex-col gap-8 items-center"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-1/2 rounded-lg p-4"
        />
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-1/2 rounded-lg p-4"
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-1/2 rounded-lg p-4"
        />
        <button
          type="submit"
          className="bg-teal-500 px-4 py-3 w-1/2 rounded-lg"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
        <div className="w-6/12 ml-1 flex">
          <Link to="/" className="text-teal-500 opacity-80">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
