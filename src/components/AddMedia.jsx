import {useState } from "react";
import TextInput from "./TextInput";


export default function AddMedia ({lists}){

    const [title, setTitle] = useState("")
    const [selectedList, setSelectedList] = useState("")

   

    function handleSubmit (event){
        event.preventDefault();
        console.log(title)
        console.log(selectedList)
        setTitle("")
        setSelectedList("")

        

    }



    return (

        <form onSubmit={handleSubmit}>
        <h1>Add Media</h1>
         <TextInput value = {title} onChange = {setTitle} />

        <select value = {selectedList} onChange = {(event) => setSelectedList(event.target.value)} 
         >
                    {/* select works with string, we store the list id*/} 

            <option value = ""> Select a list</option>
            {lists.map((item) =>  (
              <option key = {item.id}
               value = {item.id}   > 

               {item.get("name")}

        </option>
            ))}
            </select>
            <button type = "submit" disabled = {!title || !selectedList}>
                Add
            </button>

        </form> 
        
    );



}

