import { useState, useEffect } from "react";
import AddForm from "../components/AddForm.jsx";
import MyListRow from "../components/MyListRow.jsx";
import SharedListRow from "../components/SharedListRow.jsx";
import AddListCard from "../components/AddListCard.jsx";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import sampleMedia from "../data/sampleMedia.js";
import MediaList from "../components/MediaList.jsx";
import Box from "@mui/material/Box";
import AddMediaModal from "../components/AddMediaModal.jsx";
import { loadTodos } from "../services/todoService.js";

// the home page: every list, by name, each one a link to its own page
export default function Home({
  lists,
  memberships,
  onAddList,
  onShare,
  onLeave,
  onLogout,
}) {

  const [mediaByList, setMediaByList] = useState({});

  //loeads the media items already in the database when lists load or change
  useEffect(() => {
    async function fetchMedia() {
      const nextMediaByList = {};
      for (const list of lists) {
        nextMediaByList[list.id] = await loadTodos(list);
      }
      setMediaByList(nextMediaByList);
    }

    fetchMedia();
  }, [lists]);


  // Links the newly saved media item to the matching list
  function handleMediaItemAdded(listId, savedMediaItem) {
    setMediaByList((prev) => ({
      ...prev,
      [listId]: [...(prev[listId] || []), savedMediaItem],
    }));
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1">
        My lists
      </Typography>

      {lists.map((list) => {
        return (
          <MediaList
            key={list.id}
            listId={list.id}
            name={list.get("name")}
            media={mediaByList[list.id] || []}
          />
        );
      })}

      {memberships.length > 0 && (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Shared with me
        </Typography>
      )}
      {memberships.map((membership) => (
        <SharedListRow
          key={membership.id}
          membership={membership}
          onLeave={onLeave}
        />
      ))}

      <Typography variant="h5" sx={{ mt: 4 }}>
        List Manager
      </Typography>
      <AddForm onAdd={onAddList} buttonLabel="New list" />
      {/* pass callbacks so the list updates immediately when a media item is added */}
          
      <AddMediaModal
        lists = {lists} onMediaItemAdded={handleMediaItemAdded} 
        />
        <Typography variant="h5" sx={{ mt: 4 }}>
        Account
      </Typography>
      <button onClick={onLogout}>Logout</button>
    </Container>
  );
}
