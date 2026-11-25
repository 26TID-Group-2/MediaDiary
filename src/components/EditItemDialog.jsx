import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { STATUSES, typeInfo, unknownTypeInfo } from "../models/mediaConstants";

// Edit one item: its status and whether it was liked, or remove it.
// This component is only rendered while it is open (MediaCard decides that),
// so the draft state below starts fresh from the item every time.
export default function EditItemDialog({ item, onClose, onSave, onRemove }) {
  const { title, type, creator, releaseYear } = item;
  const { label: typeLabel } = typeInfo[type] ?? unknownTypeInfo;

  // The draft: changes only become real when the user presses Save.
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const [selectedLiked, setSelectedLiked] = useState(item.liked);

  // Controls smaller "are you sure?" dialog.
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleSave() {
    onSave({ status: selectedStatus, liked: selectedLiked });
    onClose();
  }

  function handleConfirmRemove() {
    setIsConfirmOpen(false);
    onRemove();
    onClose();
  }

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="edit-item-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="edit-item-title">
          Edit item
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Title and heart on one row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ color: "primary.dark", minWidth: 0 }}
            >
              {title}
            </Typography>

            <Checkbox
              edge="end"
              checked={Boolean(selectedLiked)}
              onChange={(e) => setSelectedLiked(e.target.checked)}
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon />}
              inputProps={{ "aria-label": "Liked" }}
              sx={{
                color: "var(--color-primary)",
                "&.Mui-checked": { color: "var(--color-primary)" },
              }}
            />
          </Box>

          {/* The same details as on the card */}
          <Typography
            variant="body2"
            sx={{ color: "var(--color-text-secondary)" }}
          >
            {[typeLabel, creator.join(", "), releaseYear]
              .filter(Boolean)
              .join(" · ")}
          </Typography>

          {/* Status chips */}
          <Typography
            variant="subtitle2"
            sx={{ mt: 3, mb: 1 }}
            id="status-label"
          >
            Status
          </Typography>
          <Box
            role="group"
            aria-labelledby="status-label"
            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
          >
            {STATUSES.map((option) => {
              const isSelected = option === selectedStatus;
              return (
                <Chip
                  key={option}
                  label={option}
                  clickable
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedStatus(option)}
                />
              );
            })}
          </Box>

          <Button
            color="error"
            variant="outlined"
            onClick={() => setIsConfirmOpen(true)}
            sx={{ mt: 4 }}
          >
            Remove from list
          </Button>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation dialog, opened on top of the edit dialog */}
      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <DialogTitle>Remove item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "{title}" will be removed from this list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmRemove}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
