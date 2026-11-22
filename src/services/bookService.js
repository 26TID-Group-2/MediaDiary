
//searches Open Library for books and returns the list of results
export async function searchBooks(query){
// encode makes the text safe inside a URL, coverts backspaces, limit=5 asks for at most 10 books
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,cover_i&limit=10`; // cambia il modo in cui ricerchi 



    //call the server and wait for an answer
    const response = await fetch(url);

    //convert the answer from json into js object to be able to read it, and waits again
    const data = await response.json();
    
    //the books are inside the docs array --> so it only return those
    return data.docs;

     }








