import { use, useState } from "react";
import TextInput from "./TextInput";

    const temporaryList = [{ id: "1", name:"cinema", type: "movie"}, {id: "2", name: "lavoro", type: "book" }, {id: "3", name: "sera", type :"tv serie"}]

export default function AddMedia (){

    const [title, setTitle] = useState("")
    const [list, setList] = useState("")

function handleList(e){
   value = {value}

}

    return (

        <form>
        <h1>Add Media</h1>
         <TextInput value = {title} onChange = {setTitle} />

        <select value = {list} onChange = {(event) => setList(event.target.value)}
         >
            {temporaryList.map((list) =>  (
              <option key = {list.id}
               value = {list.id}   > 

               {list.name}

        </option>
            ))}
            </select>
        </form> 
        
    )



}
