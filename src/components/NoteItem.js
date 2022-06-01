import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

// NoteItem function will have all the notes and their details which will be passed to <Notes /> component
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context; // Destructuring
    const { note, updateNote } = props; // Destructuring

    return (
        <div className='col-md-3'>
            <div className="card my-2">
                    <div className="card-body">
                        <p className="card-text">{note.title}</p>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                            <i className="fa-solid fa-trash-can mx-2" onClick={ () => {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success");}}></i> {/* delete icon */}
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={ () => {updateNote(note); }}></i> {/* edit icon */}

                        {/* <i className="fa-solid fa-circle-info mx-2"> Full Note</i> */}
                    </div>
            </div>
            
        </div>
    )
}

export default NoteItem