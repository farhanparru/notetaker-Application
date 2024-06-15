import React from 'react'
import {useNavigate} from 'react-router-dom'

const User = () => {

 const navigate = useNavigate()

  const handleCreateButtonClick = ()=>{
    navigate('/create-note')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-2xl mb-4">User Entry Page</h1>
      <button
        type="button"
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleCreateButtonClick} >
        Create Button
      </button>
  </div>
);
};

export default User
