import react from "react";
import { Link } from "react-router-dom";


const getNoteTitle=(note)=>{

    return note.body.split("\n")[0]

}

const getDate=(note)=>{

    return new Date(note.updated).toLocaleDateString()
}


const ListItem=({note})=>{
    console.log(note)
    return(
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
            <h5>{getNoteTitle(note)}</h5>
            <p><span>{getDate(note)}</span></p>
            </div>
        </Link>
    )

}

export default ListItem