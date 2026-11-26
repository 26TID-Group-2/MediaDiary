import MediaCard from "./MediaCard";
import ListOptionsMenu from "./ListOptionsMenu";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// One list: its name, and a card for every item in it.
// It only shows what it is given: the items live in App (useMediaItems).
export default function MediaList({
  list,
  name,
  items,
  lists, // all my lists: the choices for "Add to list"
  layout = "scroll",
  onAddMedia,
  onSave,
  onRemove,
}) {
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

      <ListOptionsMenu
        list={list}
        lists={lists}
        name={name}
        onAddMedia={onAddMedia}
      />

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
                lists={lists}
                onSave={onSave}
                onRemove={onRemove}
                onAddMedia={onAddMedia}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
