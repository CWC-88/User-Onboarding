import React, {useState} from "react";
import logo from './logo.svg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notes from "./components/pHoRm";
import NoteForm from "./components/Form";
import * as Yup from "yup";
import axios from 'axios'



import './App.css';

function App() {
  const [notesState, setNotesState] = useState([
    {
      id: 1,
      title: "Corona quote",
      body:
        "Why contain it? - Bob Page"
    }
  ]);

const handleSubmit = (values , tools) =>{
  axios.post(`http://localhost:3001/login`, values)
  .then(res => {
    setNotesState(res.data.notesState);
    tools.resetForm()
  })
  .catch()
  .finally(() =>{
    tools.setNotesState(false)
  })
}

  const addNoteHandler = newNote => {
    console.log("adding note", newNote);
    setNotesState([...notesState, newNote]);
    //Update the state.
  };

  return (
    <div className="App">
      <h1>My Notes</h1>
      <NoteForm addNote={addNoteHandler} />
      <Notes notes={notesState} />
    </div>
  );
}

export default App;

