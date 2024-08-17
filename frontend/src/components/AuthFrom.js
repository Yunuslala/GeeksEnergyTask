import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "./Popup";

const Register = () => {
      const url="http://localhost:4500"
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber:"",
    profession:""
  });
  const navigate = useNavigate();

  const { email, username, password,phoneNumber,profession } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${url}/api/auth/register`, formData);
      console.log(data.data);
      if(data.success){
        SuccessToast(data.msg)
        navigate("/");
      }else{
        ErrorToast(data?.msg)
      }
     
    } catch (err) {
      console.log("err",err);
      ErrorToast(err.response.data.msg);
    }
  };

  return (
    <div className="form-container w-[100%]">
      <div className="w-[100%] mt-[40px]  flex flex-col  mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto w-[70%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profession"
            >
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={profession}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-between mt-[10px]">
            Already SignUp?{" "}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-sky-300"
            >
              SignIn
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
