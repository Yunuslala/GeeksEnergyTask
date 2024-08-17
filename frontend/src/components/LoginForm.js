import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoggin } from '../redux/slices/AuthSlice/AuthSlice';
import { useDispatch } from 'react-redux';
import { ErrorToast, SuccessToast,  } from './Popup';




const LoginForm = () => {
     const url="http://localhost:4500"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(`${url}/api/auth/login`,formData);
      if(data.success){
        SuccessToast(data.msg)
        dispatch(setLoggin(data.data))
        localStorage.setItem("geeksAuthToken",data.token);
        navigate('/home');
      }else{
        console.log("error",data);
        ErrorToast(data?.msg)
      }
    }catch(err){
   
        console.log("err",err);
        ErrorToast(err.response.data.msg);
      
    }
 
  
  
  
  };

  return (
    <div className="form-container w-[100%]">
    <div className="w-[100%] mt-[40px]  flex flex-col  mx-auto p-4">
    
    <form onSubmit={handleSubmit} className="max-w-md mx-auto w-[70%] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          Sign In
        </button>
      </div>
      <div className="flex items-center justify-between mt-[10px]">
        
        You have not Signed Up Yet? <span onClick={()=>navigate("/register")} className='cursor-pointer hover:text-sky-300'>SignUp</span> 
      
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
