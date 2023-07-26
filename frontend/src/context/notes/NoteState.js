import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    // this is the url where backend is hosted
    // const host = "http://localhost:5000";
    const host = "https://up-2-date.onrender.com"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)
    //get all note
    const getAllNotes = async (title, description, tag) => {
        //get all note API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        // client end 
        const json = await response.json()
        //console.log(json)
        setNotes(json)
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //addnote API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }) // body data type 
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        // console.log("adding a new note")
        setNotes(notes.concat(note))// will add note to notes array
    }
    // Delete a note
    const deleteNote = async (id) => {
        //deletenote API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)


        //client side
        //console.log(`deleting note with  id :${id}`)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // editNote api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // client end 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index]
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].tag = tag;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        // <NoteContext.Provider value={{ state, update }}> {/* now a object is being exported that includes a state and a fnc called update */}
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}> {/* now a object is being exported that includes a state and a fnc called update */}
            {
                props.children// i.e this will be available to all children of it
            }
        </NoteContext.Provider>
    )
}
export default NoteState;