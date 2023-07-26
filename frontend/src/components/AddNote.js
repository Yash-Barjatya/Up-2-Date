import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
export const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context// destructuring
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })// once not is added make all fields empty
        props.showAlert("Note added successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div className="container my-3">
            <h1 className=" my-3">Add a Note</h1>
            <form >
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="add a title to your note" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3 my-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="add a tag to your note" value={note.tag} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea placeholder="add a description to your note" className="form-control" id="description" name="description" value={note.description} onChange={onChange} rows="3" ></textarea>
                </div>
                <button disabled={note.title.length < 2 || note.description.length < 5 || note.tag.length < 2} type="submit" onClick={handleAddClick} className="btn btn-success mb-3">Add Note</button>
            </form>
        </div>

    )
}
