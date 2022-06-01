import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

// This will be passed to home page as a component to show notes on UI
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context; // Getting all these functions from <NoteState /> component

  // fetch all notes only if user is logged in Othewise redirect him on login page
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
      // eslint-disable-next-line
    }
    else {
      navigate("/login");
    }
  }, [])

  /*
  Refs are a function provided by React to access the DOM element and the React element that you might have created on your own. They are used in cases where we want to change the value of a child component, without making use of props and all.
  */
  const refUpdate = useRef(null); // using useRef (Javascript) to open an edit/update modal
  const refClose = useRef(null); // using useRef (Javascript) to close the edit modal after editing is completed

  const [note, setNote] = useState({ id: "", edit_title: "", edit_description: "", edit_tag: "" });

  const updateNote = (currentNote) => {
    refUpdate.current.click(); // wherever the current reference is point -> it will be opened in modal for editing
    setNote({
      id: currentNote._id,
      edit_title: currentNote.title,
      edit_description: currentNote.description,
      edit_tag: currentNote.tag
    }); // It will give the already written text in edit pop up modal. so that we can change easily.
  }

  const handleUpdateNoteClick = async (e) => {
    await editNote(note.id, note.edit_title, note.edit_description, note.edit_tag); // update the values of note
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }) // Whatever properties "note" object has, it should remain as it is. But whatever properties are written after "...note, " -> It should be added or replaced 
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      {/* modal for updating notes  */}
      {/* use ref={ref} which means reference is holding this button */}
      <button ref={refUpdate} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* Update form  */}
              <div className="mb-3">
                <label htmlFor="edit_title" className="form-label">Title</label>
                <input type="text" className="form-control" id="edit_title" name="edit_title" value={note.edit_title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edit_description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edit_description" value={note.edit_description} name="edit_description" onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edit_tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="edit_tag" value={note.edit_tag} name="edit_tag" onChange={onChange} />
              </div>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.edit_title.length < 5 || note.edit_description < 5} type="button" className="btn btn-primary" onClick={handleUpdateNoteClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display! Try to add a note"}
        </div>

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} /> // passing it to the "NoteItem component" with "note as props" which will show notes to user.
        })}
      </div>
    </>
  );
};

export default Notes;
