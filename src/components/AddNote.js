import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context; // Gets notes from <NoteState /> component

     // Using useState hook, creating a state
     const [note, setNote] = useState({title: "", description: "", tag: ""});
 
    const handleAddNoteClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""}); // Once note is added, make all the fields blank again
        props.showAlert("Note added Successfully", "success");
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value }) // Whatever properties "note" object has, it should remain as it is. But whatever properties are written after "...note, " -> It should be added or replaced 
    }
    return (

        <div className="container my-3">
            <h1>Add a note</h1>

            <form onSubmit={handleAddNoteClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description < 5} type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote