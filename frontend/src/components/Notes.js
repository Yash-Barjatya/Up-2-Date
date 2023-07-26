import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, getAllNotes, editNote } = context// destructuring;
    useEffect(() => {
        if (localStorage.getItem('token')) {// so that if anyone goes to home page then without a token then we redirect it to login page
            getAllNotes();// if token is not null then we will get all notes
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", edit_title: "", edit_description: "", edit_tag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();// JS syntax  for modal required for note editing
        setNote({ id: currentNote._id, edit_title: currentNote.title, edit_tag: currentNote.tag, edit_description: currentNote.description })

    }
    const handleClick = () => {
        editNote(note.id, note.edit_title, note.edit_description, note.edit_tag)
        refClose.current.click();// JS syntax  for modal required for note editing
        props.showAlert("Note updated successfully", "success")

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Note
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.edit_title} className="form-control" id="edit_title" name="edit_title" placeholder="add a title to your note" onChange={onChange} />
                                </div>
                                <div className="mb-3 my-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.edit_tag} className="form-control" id="edit_tag" name="edit_tag" placeholder="add a tag to your note" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea placeholder="add a description to your note" value={note.edit_description} className="form-control" id="edit_description" name="edit_description" onChange={onChange} rows="3" ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.edit_title.length < 2 || note.edit_description.length < 5 || note.edit_tag.length < 2} onClick={handleClick} type="button" className="btn btn-success">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 className=" my-3">Your Notes</h1>
                <div className="container mx-1">
                    {notes.length === 0 && <h5>No notes to display</h5>}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes 
