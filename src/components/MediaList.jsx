import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  fetchMediaItems,
  updateMediaItem,
  deleteMediaItem,
} from "../services/mediaService.js";

// One list: its name, and a card for every item in it.
// It loads and owns its items, so Home (many lists) and ListPage (one list)
// don't have to know anything about them.
export default function MediaList({
  list,
  name,
  layout = "scroll",
  onAddMedia,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // "ignore" stops a slow, outdated response from overwriting newer state
    // (e.g. when listId changes quickly, or React runs the effect twice in dev)
    let ignore = false;

    async function load() {
      try {
        const loaded = await fetchMediaItems(listId);
        if (!ignore) setItems(loaded);
      } catch (error) {
        alert(error.message);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [listId]);

  // Save to the database first, then update the screen,
  // so a failed save never looks like it worked.
  async function handleSave(id, changes) {
    try {
      await updateMediaItem(id, changes);
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, ...changes } : item,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRemove(id) {
    try {
      await deleteMediaItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component={Link}
        to={`/lists/${list.id}`}
        sx={{
          color: "text.primary",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {name}
      </Typography>

      <ListOptionsMenu list={list} name={name} onAddMedia={onAddMedia} />

      {items.length === 0 ? (
        <Typography sx={{ py: 2, color: "text.secondary" }}>
          Nothing on this list yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: layout === "wrap" ? "wrap" : "nowrap",
            overflowX: layout === "wrap" ? "visible" : "auto",
            py: 2,
          }}
        >
          {items.map((item) => (
            <Box key={item.id} sx={{ flexShrink: 0 }}>
              <MediaCard
                item={item}
                onSave={handleSave}
                onRemove={handleRemove}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
