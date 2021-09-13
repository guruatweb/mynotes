import { getNodeText } from "@testing-library/dom";
import react,{useState,useEffect, createContext} from "react";
// import notes from "../assets/data";
import { Link } from "react-router-dom";
import {ReactComponent as Arrow_left} from "../assets/arrow-left.svg"

const NotePage=({match,history})=>{
    
    let noteId=match.params.id

    //let note=notes.find(note=> note.id===Number(noteId))
    let [note,setNote]=useState([])

    useEffect(()=>{
        getNote(noteId)

    },[noteId])

    let getNote=async()=>{
        if(noteId==='new') return
        let responce=await fetch(`http://localhost:8000/notes/${noteId}`);
        let data=await responce.json();
        setNote(data)
    }

    let updateNote= async()=>{
        await fetch(`http://localhost:8000/notes/${noteId}`,
        {
            method : "PUT",
            headers : {
                "Content-type" : "application/json"
            },
            body :JSON.stringify({...note,'updated':new Date()})

        }
        )

    }

    let createNote=async ()=>{

        await fetch(`http://localhost:8000/notes/`,{
            method: 'POST',
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({...note,'updated':new Date()})
        })


    }

    let handleSubmit=()=>{

        console.log(noteId)
        if(noteId!=='new' && !note.body){
            deleteNote()
        }else if(noteId!=='new'){
            updateNote()
            history.push('/')    
        }else if(noteId==='new' && note.body){
            console.log("new",note)
            createNote()
            history.push('/')    
        }
        

    }

    let deleteNote=async()=>{

        let res=window.confirm('Do you want to delete Note ?');

        if(res){

        await fetch(`http://localhost:8000/notes/${noteId}`,{
            method : 'DELETE'
        })

        history.push('/')
    }

    }

    
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/" > <Arrow_left onClick={handleSubmit} /> </Link>
                </h3>
                {noteId!=='new'?(<button onClick={deleteNote}>Delete</button>):
                (<button onClick={handleSubmit}>Done</button>)}
                
            </div>
            
            <textarea onChange={(e)=>{setNote({...note,'body': e.target.value })}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage