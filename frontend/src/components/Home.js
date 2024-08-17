import React, { useEffect } from "react";
import { useState } from "react";
import { ErrorToast } from "./Popup";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Home = () => {
  const url = "https://geeksenergyback.onrender.com";
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("geeksAuthToken");
  const authemail = localStorage.getItem("geeksAuthemail");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      ErrorToast("You Are not Authorised User Go for Login");
      navigate("/");
    }

    getAllData();
  }, [authemail,token]);
  const getAllData = async () => {
    try {
      const { data } = await axios.get(`${url}/api/user`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (data.success) {
        setdata(data.data);
      } else {
        ErrorToast(data?.response?.data?.msg);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.msg);
    }
  };
  const editPage = (id) => {
    navigate(`/update-profile/${id}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        All User
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {item?.username}
              </h2>
              <p className="mb-4 text-gray-600">{item?.phoneNumber}</p>
              <p className="mb-4 text-gray-600">{item?.email}</p>
              <p className="mb-4 text-gray-600">{item?.profession}</p>

              {authemail==item.email?<div className="flex justify-between mt-4">
                <button
                  onClick={() => editPage(item._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Edit
                </button>
              </div>:null}
            </div>
          ))
        ) : (
          <div className="flex items-center mx-auto justify-center h-64 bg-gray-100 rounded-lg shadow-md p-6">
            <p className="text-lg font-semibold text-gray-700">
              No User available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
