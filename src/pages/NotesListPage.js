import react,{useState,useEffect} from "react";
// import notes from "../assets/data";
import ListItem from "../components/ListItem";
import Addbutton from "../components/AddButton";

const NotesListPage=()=>{
    let [notes,seNotes]=useState([])

    useEffect(()=>{
        getNotes()
    },[])

    let getNotes=async()=>{
        let responce=await fetch('http://localhost:8000/notes');
        let data=await responce.json();
        seNotes(data);
    }
    return(
        <div className="notes">
            <div className="notes-header">
                <div className="notes-title">&#9782; Notes</div>
                <p className="notes-count"> {notes.length} </p>

            </div>
            <div className="notes-list">
                {notes.map((note,index)=>
                    // <p>{x.body}</p>
                    <ListItem key={index} note={note}/>     
                    )}
            </div>
            <Addbutton/>
        </div>

    )
}

export default NotesListPage