import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "./Popup";

const Dashboard = () => {
  const url = "https://note-taking-backend-qa15.onrender.com";
  const [Note, setNote] = useState([
  
  ]);
  const [flag, setFlag] = useState(false);
  const [usertoken, setUsertoken] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("noteToken");
  useEffect(() => {

    if (!token) {
      ErrorToast("You Are not Authorised User Go for Login");
      navigate("/");
    }
    setUsertoken(token);
    FetchUserNotes();
  }, [flag]);
  const FetchUserNotes = async () => {
    try {
      const { data } = await axios.get(`${url}/api/notes`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if(data.success){
        setNote(data.data);
      }
      
    } catch (error) {
      
    }
  
  };
  const handleCreateNotes = () => {
    navigate("/note-creates");
  };

  const handleEditNote = (id) => {
    navigate(`/note-creates/${id}`);
  };

  const handleDeleteNote = async (id) => {
    const { data } = await axios.delete(`${url}/api/notes/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    if (data.success) {
      setFlag((prev) => !prev);
      SuccessToast(data.msg);
    } else {
      ErrorToast(data.response.data.msg);
    }
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Dashboard</h1>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateNotes}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Note.length > 0 ? (
          Note.map((item) => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                {item?.userId?.name}
              </h2>
              <p className="mb-4 text-gray-600">{item?.topic}</p>
              <p className="mb-4 text-gray-600">{item?.description}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditNote(item._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center mx-auto justify-center h-64 bg-gray-100 rounded-lg shadow-md p-6">
            <p className="text-lg font-semibold text-gray-700">
              No Notes available. Please{" "}
              <p onClick={()=>navigate("/note-creates")} className="text-blue-500 underline cursor-pointer">
                create one
              </p>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
