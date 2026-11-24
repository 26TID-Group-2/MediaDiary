//Our list item component. One card that shows a movie, tv show or book.
//It's a reusable building block - we just write it once, and App uses it once for every item in our list.

import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import EditItemDialog from "./EditItemDialog";
import AddMediaDialog from "./AddMediaDialog";
import { typeInfo, unknownTypeInfo } from "../models/mediaConstants";

// The card gets ONE item and shows it.
// It does not own the item's data: status and liked come straight from
// the item, and changes go UP through onSave / onRemove.
function MediaCard({ item, lists, onSave, onRemove, onAddMedia }) {
  const { title, type, creator, releaseYear, status, liked, pictureUrl } = item;

  const { icon: TypeIcon, label: typeLabel } =
    typeInfo[type] ?? unknownTypeInfo;

  // Only state about how the card LOOKS is kept here:
  const [isEditOpen, setIsEditOpen] = useState(false); // is the edit dialog open?
  const [isAddToListOpen, setIsAddToListOpen] = useState(false); // is the add-to-list dialog open?
  const [menuAnchor, setMenuAnchor] = useState(null); // which "..." button the menu hangs on (null = closed)
  const [imageFailed, setImageFailed] = useState(false); // did the picture fail to load?

  const isMenuOpen = menuAnchor !== null;
  const showImage = pictureUrl && !imageFailed;

  function handleMenuOpen(event) {
    setMenuAnchor(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchor(null);
  }

  function handleEditClick() {
    setMenuAnchor(null);
    setIsEditOpen(true);
  }

  function handleAddToListClick() {
    setMenuAnchor(null);
    setIsAddToListOpen(true);
  }

  return (
    <Card sx={{ width: 280, borderRadius: "var(--radius)" }}>
      {/* Cover: the picture, or a grey placeholder if there is none
        (or if it failed to load). */}
      {showImage ? (
        <CardMedia
          component="img"
          image={pictureUrl}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
          sx={{ height: 160, objectFit: "cover", objectPosition: "top" }}
        />
      ) : (
        <Box
          sx={{
            height: 160,
            bgcolor: "var(--color-grey)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageOutlinedIcon sx={{ fontSize: 48, color: "white" }} />
        </Box>
      )}

      <CardContent>
        {/* TOP ROW: text on the left, heart on the right.
        justifyContent: "space-between" pushes them apart. */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            {/* Left side: icon + title, and creator + year below. */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* titleAccess gives the icon a text that screen readers
                  read aloud, for example "Movie". */}
              <TypeIcon
                sx={{ color: "var(--color-primary-dark)" }}
                titleAccess={typeLabel}
              />
              <Tooltip title={title} placement="top">
                <Typography
                  variant="h6"
                  component="h3"
                  noWrap
                  sx={{ color: "primary.dark" }}
                >
                  {title}
                </Typography>
              </Tooltip>
            </Box>
            {/* creator is an array: .join(", ") turns
                ["Marta Kauffman", "David Crane"] into
                "Marta Kauffman, David Crane". */}
            <Tooltip title={creator.join(", ")} placement="top">
              <Typography
                variant="body2"
                sx={{ color: "var(--color-text-secondary)" }}
              >
                {creator.join(", ")}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: "var(--color-text-secondary)" }}
            >
              {releaseYear}
            </Typography>
          </Box>

          {/* Liked is just an icon, not a button: changing it happens in the edit dialog. */}
          {liked ? (
            <FavoriteIcon
              titleAccess="Liked"
              sx={{ color: "var(--color-primary)", flexShrink: 0 }}
            />
          ) : (
            <FavoriteBorderIcon
              titleAccess="Not liked"
              sx={{ color: "var(--color-primary)", flexShrink: 0 }}
            />
          )}
        </Box>

        {/* BOTTOM ROW: status tag on the left, "..." on the right.*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Chip
            label={status}
            size="small"
            sx={{ bgcolor: "var(--color-background)" }}
          />

          <IconButton
            aria-label={`More options for ${title}`}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={handleMenuOpen}
          >
            <MoreHorizIcon />
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>Edit item</MenuItem>
            <MenuItem onClick={handleAddToListClick}>Add to list</MenuItem>
          </Menu>
        </Box>
      </CardContent>

      {isEditOpen && (
        <EditItemDialog
          item={item}
          onClose={() => setIsEditOpen(false)}
          onSave={(changes) => onSave(item.id, changes)}
          onRemove={() => onRemove(item.id)}
        />
      )}
      {/* the same dialog as the + button, but filled in with this item.
          Not offered: the list the item is already on. */}
      <AddMediaDialog
        open={isAddToListOpen}
        onClose={() => setIsAddToListOpen(false)}
        lists={lists.filter((list) => list.id !== item.listId)}
        initialItem={item}
        onAddMedia={onAddMedia}
      />
    </Card>
  );
}

export default MediaCard;
