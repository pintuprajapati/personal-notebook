import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitials = []
    const [notes, setNotes] = useState(notesInitials); // Notes will be "notesInitials" and we can use setNotes whenever we update the notes.

    // Get all notes
    const getNotes = async () => { 
      // API call
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        // body: JSON.stringify()
      });
      const json = await response.json();
      setNotes(json);
    }; 

    // Add a Note
    const addNote = async (title, description, tag) => { 
      // API call
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();

      // Logic to add a new note
      const note = json;
      setNotes(notes.concat(note)); // Concat will return new note arary
    }

    // Delete a Note
    const deleteNote = async (id) => {

      // API call
      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      const newNote = notes.filter((note) => {return (note._id !== id)})
      setNotes(newNote);
    }

    // Edit or Update a Note
    const editNote = async (id, title, description, tag) => { 
      // API call
      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag})
      }); 
      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes)); // it will create a deep copy -> original reference won't be changed but the copied data will be changed only 

      // Logic to edit/update the note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; // Once we have updated the data -> It will break and get out of the for loop
        }
        
      }
      setNotes(newNotes);
    }

  return (
      // exporting notes, addNote, deleteNote, editNote as a value to <Notes /> component
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}> 
          {props.children};
      </NoteContext.Provider>
  )
};

export default NoteState;