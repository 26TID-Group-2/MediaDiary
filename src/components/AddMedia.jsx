import {useState } from "react";
import TextInput from "./TextInput";
import { addTodo } from "../services/todoService";
import { searchBooks } from "../services/bookService";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";



export default function AddMedia ({lists,  onClose}){

    // title stores what the user types in
    const [title, setTitle] = useState("")
    // selectedListId stores the Id of the list chosen by the user from the dropdown menu
    const [selectedListId, setSelectedListId] = useState("")
    // searchResults stores the array of books returned by the Open Library API
    const [searchResults, setSearchResults] = useState([])

    const [like, setLike] = useState(false)

    const statuses = ["Interested", "In Progress", "Finished"]; 
    const [currentStatus, setCurrentStatus] = useState("interested");



   
    //database handler :
    //async because talking to Back4App takes time
    async function handleSubmit (event){ 
        event.preventDefault(); //prevents the page from reloading the page
        const matchingList = lists.find((list) => list.id === selectedListId); //find the matching list object in our lists array (using id)

        if(!matchingList) {
            console.error("No list found")
            return;
        }
//duplicate check

       
        
        try {
            //addTodo from todoService. await pauses the execution unitl the database confirms the item is saved
            const savedItem = await addTodo(matchingList, title) //passing the list object and the title the user typed. Await is used because save() talks to the database

            alert(`${title} was successfully added to the list!`);
             console.log(savedItem ,"successfully saved"); 
             

             setTitle(""); // we set the form state back to empty afer savng 
             setSelectedListId("");
        
        if (onClose) { //non so se funziona
            onClose(); 
        }
// we catch any errors from the database and show it
        } catch (error) {
            alert(error.message); 
        }
       

        

    }

   

    //API search handler
    //connects to bookService, fetch book from Open Library
    async  function handleSearch () {

        try{
            const foundBooks = await searchBooks(title) // waits for the API to respond with the matching books array
            setSearchResults(foundBooks) //save the returned books into our component state 
        }
        catch (error) {
            alert(error.message)
        }

    }



    return (

        <form onSubmit={handleSubmit}>
        {/* Box stacks the fields vertically, with a gap between them */}
        <Box sx= {{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* title field and search button side by side */}

        <Box sx= {{ display: "flex", gap:  1}}>
         <TextInput value = {title} onChange = {setTitle} /> {/* TextInput, updates the title state when the user types */}
        
        <button type='button' onClick={handleSearch} disabled={!title}> Search 

        </button>

        </Box>

        

        <select 
        value = {selectedListId} 
        onChange = {(event) => setSelectedListId(event.target.value)} 
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

        {/* One chip per status, the chosen one is filled, the others only outlined */}
        <Box sx= {{display: "flex", gap: 1}}>
            {statuses.map((option) => (
            <Chip
            key={option}
            label={option}
            onClick={() => setCurrentStatus(option)}
            variant={option === currentStatus ? "filled" : "outlined"}
            aria-pressed={option === currentStatus}

            />
            ))}
            </Box>

         {/* hearth button: toggles the like state */}

         <IconButton
            onClick={() => setLike(!like)}
            aria-pressed={like}
            aria-label={
              like
                ? "Remove from favourites"
                : "Add to favourites"
            }
          >
            {like ? (
              <FavoriteIcon sx={{ color: "var(--color-primary)" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "var(--color-primary)" }} />
            )}
          </IconButton>


         <button type = "submit" disabled = {!title || !selectedListId}>
               Add
            </button>
            </Box>

        </form>        
    );

}

