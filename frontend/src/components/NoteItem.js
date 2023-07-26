import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context// destructuring
    const { note, updateNote } = props;
    return (
        <div className="col-md-4 ">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <button onClick={() => { updateNote(note); }} className="btn btn-warning mx-2"><i className="fa fa-pencil">   Edit Note</i></button>
                    <button onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "success") }} className="btn btn-danger mx-2"><i className="fa fa-trash-o"> Delete Note</i></button>
                </div>
            </div>
        </div >
    )
}

export default NoteItem
