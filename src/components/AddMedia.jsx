import { useState } from "react";
import TextInput from "./TextInput";


export default function AddMedia (){

    const [title, setTitle] = useState("")

    return (

        <form>
        <h1>Add Media</h1>
         <TextInput value = {title} onChange = {setTitle} />

        </form>
       
        
    )



}
