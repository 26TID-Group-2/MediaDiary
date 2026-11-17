import { useEffect } from "react"

//searches Open Library for books and returns the list of results
export async function searchBooks(query){
// encode makes the text safe inside a URL, coverts backspaces and limit=5 asks for at most 5 books
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`; 

    //call the server and wait for an answer
    const response = await fetch(url);

    //convert the answer from json into js object to be able to read it, and waits again
    const data = await response.json();
    
    //the books are inside the docs array --> so it only return those
    return data.docs

     }





