import {useState } from "react";
import TextInput from "./TextInput";
import { addTodo } from "../services/todoService";


export default function AddMedia ({lists,  onClose}){

    const [title, setTitle] = useState("")
    const [selectedListId, setSelectedListId] = useState("")
3
   

    async function handleSubmit (event){ //taliking to the database takes time, that's why it's async
        event.preventDefault();
        const matchingList = lists.find((list) => list.id === selectedListId); //find the matching list object in our lists array (using id)

        if(!matchingList) {
            console.error("No list found")
            return;
        }
//duplicate check
c
        for(let item of (matchingList.get("items") || [])) { //loop through the list s item (if the list is empty, we use [] to avoid errors)
            if (item.title == title) {
                alert(`Warning: "${title}" is already present in this list!`);
                return; // stops everything and prevent saving
                }
            }
        
        try {
            const savedItem = await addTodo(matchingList, title) //passing the list object and the title the user typed. Await is used because save() talks to the database

            alert(`${title} was successfully added to the list!`);
             console.log(savedItem ,"successfully saved"); 

             setTitle(""); // we set the form state back to empty
             setSelectedListId("");
        
        if (onClose) {
            onClose(); 
        }

        } catch (error) {
            alert(error.message); 
        }
       

        

    }



    return (

        <form onSubmit={handleSubmit}>
         <TextInput value = {title} onChange = {setTitle} />

        <select value = {selectedListId} onChange = {(event) => setSelectedListId(event.target.value)} 
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
            <button type = "submit" disabled = {!title || !selectedListId}>
                Add
            </button>

        </form> 
        
    );



}

