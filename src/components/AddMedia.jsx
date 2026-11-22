import { useState } from "react";
import TextInput from "./TextInput";
import { addTodo } from "../services/todoService";
import { searchBooks } from "../services/bookService";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

const statuses = ["Interested", "In Progress", "Finished"];  // the possible statuses; it never changes, so it lives outside the component

export default function AddMedia({ lists, onClose }) {
  // title stores what the user types in
  const [title, setTitle] = useState("");
  // selectedListId stores the id of the list chosen in the dropdown menu
  const [selectedListId, setSelectedListId] = useState("");
  // searchResults stores the array of books returned by the Open Library API
  const [searchResults, setSearchResults] = useState([]);
  // like: true = favourite, false = not favourite
  const [like, setLike] = useState(false);
  // the chosen status; starts as "Interested" so there is always a valid value
  const [currentStatus, setCurrentStatus] = useState("Interested");
  // creator and year come from the book the user picks in the search results
  const [creator, setCreator] = useState("");
  const [year, setYear] = useState("");

  // async because talking to the database (Back4App) takes time
  async function handleSubmit(event) {
    event.preventDefault(); // prevents the page from reloading

    // find the full list object using the id stored in state
    const matchingList = lists.find((list) => list.id === selectedListId);

    if (!matchingList) {
      console.error("No list found");
      return;
    }

    // temporary: shows what will be saved once the database fields exist
    console.log(title, creator, year, currentStatus, like);

    try {
      // await pauses until the database confirms the item is saved
      const savedItem = await addTodo(matchingList, title);

      alert(`${title} was successfully added to the list!`);
      console.log(savedItem, "successfully saved");

      // reset the form after saving
      setTitle("");
      setSelectedListId("");
      setCreator("");
      setYear("");
      setLike(false);
      setCurrentStatus("Interested");

      if (onClose) {
        onClose(); // closes the modal
      }
    } catch (error) {
      // we catch any error from the database and show it
      alert(error.message);
    }
  }

  // API search handler: asks bookService for books matching the title
  async function handleSearch() {
    try {
      const foundBooks = await searchBooks(title);
      setSearchResults(foundBooks);
    } catch (error) {
      alert(error.message);
    }
  }

  // runs when the user clicks a book in the results: fills the form
  function handleSelectBook(book) {
    setTitle(book.title);
    setCreator(book.author_name?.join(", ") || "author unknown");
    setYear(book.first_publish_year || "");

    // hides the search results
    setSearchResults([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Box stacks the fields vertically, with a gap between them */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* title field and search button side by side */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextInput value={title} onChange={setTitle} />
          <button type="button" onClick={handleSearch} disabled={!title}>
            Search
          </button>
        </Box>

        {/* one clickable row per book found */}
        {searchResults.map((book) => (
          <button
            type="button" // so it does not submit the form
            key={book.key} // unique id from Open Library, tells the books apart
            onClick={() => handleSelectBook(book)}
          >
            {book.title}
            {" - "}
            {book.author_name?.join(", ") || "author unknown"}
            {book.first_publish_year ? `, ${book.first_publish_year}` : ""}
          </button>
        ))}

        {/* a select works with strings, so we store the list id */}
        <select
          value={selectedListId}
          onChange={(event) => setSelectedListId(event.target.value)}
        >
          <option value="">Select a list</option>
          {lists.map((item) => (
            <option key={item.id} value={item.id}>
              {item.get("name")}
            </option>
          ))}
        </select>

        {/* one chip per status: the chosen one is filled, the others outlined */}
        <Box sx={{ display: "flex", gap: 1 }}>
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

        {/* heart button: toggles the like state */}
        <IconButton
          onClick={() => setLike(!like)}
          aria-pressed={like}
          aria-label={like ? "Remove from favourites" : "Add to favourites"}
        >
          {like ? (
            <FavoriteIcon sx={{ color: "var(--color-primary)" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "var(--color-primary)" }} />
          )}
        </IconButton>

        <button type="submit" disabled={!title || !selectedListId}>
          Add
        </button>
      </Box>
    </form>
  );
}