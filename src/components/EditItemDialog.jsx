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
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Moved here from MediaCard, which no longer uses it.
const statuses = ["Interested", "In Progress", "Finished"];

export default function EditItemDialog({
  open,
  onClose,
  title,
  type,
  creator,
  year,
  status,
  onSave,
  onRemove,
  liked,
}) {
  // The status picked in the dialog. It only becomes "real" on Save.
  const [selectedStatus, setSelectedStatus] = useState(status);

  //Whether the user liked the media or not
  const [selectedLiked, setSelectedLiked] = useState(liked);

  // Controls the second, smaller "are you sure?" dialog.
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Closing without saving throws away the unsaved choice,
  // so the dialog opens with the real status next time.
  function handleClose() {
    setSelectedStatus(status);
    setSelectedLiked(liked);
    onClose();
  }

  function handleSave() {
    onSave({ status: selectedStatus, liked: selectedLiked });
    onClose();
  }

  function handleConfirmRemove() {
    setIsConfirmOpen(false);
    onRemove(); // TODO: real removal once the database is ready
    onClose();
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-item-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="edit-item-title">
          Edit item
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* The same details as on the card */}
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
              checked={selectedLiked}
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
            {statuses.map((option) => {
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
