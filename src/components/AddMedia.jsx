import {useState } from "react";
import TextInput from "./TextInput";


export default function AddMedia ({lists}){

    const [title, setTitle] = useState("")
    const [list, setList] = useState("")



    return (

        <form>
        <h1>Add Media</h1>
         <TextInput value = {title} onChange = {setTitle} />

        <select value = {list} onChange = {(event) => setList(event.target.value)} 
         >
                    {/* select works with string */} 

            <option value = ""> Select a list</option>
            {lists.map((item) =>  (
              <option key = {item.id}
               value = {item.id}   > 

               {item.get("name")}

        </option>
            ))}
            </select>
                        <p> {list}</p>

        </form> 
        
    )



}
