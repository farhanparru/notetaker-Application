import React, { useEffect, useState } from "react";
import axios from 'axios'

const NotesCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [notes,setNotes] = useState([])
  const [editNoteId, setEditNoteId] = useState(null)


  useEffect(()=>{
    fetchNote()
  },[])

  // 
  const fetchNote= async () =>{
    try {
        const response = await axios.get('http://localhost:3000/api/note/getNote')
        setNotes(response.data)
    } catch (error) {
        console.log('Error fething data', error);
    }
  }


//
  const handleSaveNote = async() => {
    setBackgroundColor(color);
     
    try {   // create Note
        const response = await axios.post('http://localhost:3000/api/note/createNote',{
            title,
            description,
            color
        })
        console.log(response.data);
        fetchNote()
        setTitle('')
        setDescription('')
        setColor('#ffffff')
       }catch(error){
         console.log('Data getting issue', error);
       }
    };

  //

  const handleUpdateNote = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:3000/api/note/getNoteId/${id}`)
        const note = response.data
        setTitle(note.title)
        setDescription(note.description)
        setColor(note.color)
        setEditNoteId(note._id)
    } catch (error) {
       console.log(error);
    }
  }

  const handleDeleteNote = async(id)=>{
   
    try {
        await axios.delete(`http://localhost:3000/api/note/deleteNote/${id}`)
        fetchNote()
    } catch (error) {
        console.log(error);
    }
  }

  const handleUpdate = async () =>{
    if(!editNoteId){
     console.log('No note selecting for update');
     return
    }
   try {
    const response = await axios.put(`http://localhost:3000/api/note/updateNote/${editNoteId}`,{
        title,
        description,
        color
    })
    setEditNoteId(null) 
    console.log('Update Note', response.data);
    fetchNote()
   } catch (error) {
    console.log('Error update', error);
   }
  }

  return (
<div
  className="flex flex-col items-center justify-center h-screen p-6"
  style={{ backgroundColor: backgroundColor }}
>
  <h1 className="text-2xl mb-4">Create a Note</h1>
  <form className="flex flex-col items-start w-full max-w-md">
    <label className="mb-2 text-lg w-full">
      Title:
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="ml-2 p-2 border border-gray-300 rounded w-full"
      />
    </label>
    <label className="mb-2 text-lg w-full">
      Description:
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="ml-2 p-2 border border-gray-300 rounded w-full"
      />
    </label>
    <label className="mb-2 text-lg w-full">
      Color:
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="ml-2 p-2 border border-gray-300 rounded"
      />
    </label>
    <button
      type="button"
      onClick={handleSaveNote}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Save Note
    </button>
    <button
      type="button"
      onClick={handleUpdate}
      className="p-2 mt-2 bg-green-500 text-white rounded"
    >
      Edit Note
    </button>
  </form>
      <div className="mt-6">
  <h2 className="text-xl mb-2">Notes List</h2>
  <table className="border-collapse border border-gray-400 w-full">
    <thead>
      <tr className="bg-gray-200">
        <th
         className="border border-gray-400 px-4 py-2">Title</th>
          <th
         className="border border-gray-400 px-4 py-2">Description</th>
        <th 
        className="border border-gray-400 px-4 py-2">Color</th>
        <th
         className="border border-gray-400 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {notes.map(note => (
        <tr key={note._id}>
          <td className="border
           border-gray-400 px-4 py-2">{note.title}</td>
          <td className="border
           border-gray-400 px-4 py-2">{note.description}</td>
          <td className="border border-gray-400 px-4 py-2">
            <div style={{ backgroundColor: note.color, width: '20px', height: '20px' }}></div>
          </td>
          <td className="border border-gray-400 px-4 py-2">
            <button className="bg-blue-500
             hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
             onClick={() => handleUpdateNote(note._id)}>
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
             onClick={() => handleDeleteNote(note._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default NotesCreationPage;
