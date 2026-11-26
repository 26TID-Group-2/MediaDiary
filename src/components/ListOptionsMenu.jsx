import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import { renameList, deleteList } from "../services/listService";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddMediaDialog from "./AddMediaDialog";
import useMenu from "../hooks/useMenu";
import DialogContentText from "@mui/material/DialogContentText";

export default function ListOptionsMenu({ list, lists, name, onAddMedia }) {
  const { menuAnchor, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();

  const [addMediaOpen, setAddMediaOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Remember what the user types as the new list name.
  const [newName, setNewName] = useState(name);

  const [isSaving, setIsSaving] = useState(false);

  function handleAddMediaOpen() {
    handleMenuClose();
    setAddMediaOpen(true);
  }

  function handleRenameOpen() {
    // Fill the input with the current list name.
    setNewName(name);

    handleMenuClose();
    setRenameOpen(true);
  }

  function handleConfirmationOpen() {
    handleMenuClose();
    setConfirmationOpen(true);
  }

  function handleConfirmDelete() {
    setConfirmationOpen(false);
    deleteList(list);
    handleMenuClose();
  }

  // Runs when the user clicks Save.
  async function handleRenameSave() {
    // Don't allow empty names.
    if (!newName.trim()) return;

    setIsSaving(true);

    try {
      // Save the new name to Back4App.
      await renameList(list, newName);

      // Close the dialog after saving successfully.
      setRenameOpen(false);
    } catch (error) {
      // Show an error if saving fails.
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <IconButton
        aria-label={`More options for ${name}`}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={handleMenuOpen}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu anchorEl={menuAnchor} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleAddMediaOpen}>
          <AddIcon sx={{ mr: 1 }} /> Add media
        </MenuItem>
        <MenuItem onClick={handleRenameOpen}>
          <EditIcon sx={{ mr: 1 }} />
          Rename list
        </MenuItem>
        <MenuItem onClick={handleConfirmationOpen}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete list
        </MenuItem>
      </Menu>
      {/* Popup for renaming the list */}
      {/* move to component */}
      <Dialog
        open={renameOpen}
        onClose={() => setRenameOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        {/* Dialog heading */}
        <DialogTitle>Rename list</DialogTitle>

        {/* Input field for the new name */}
        <DialogContent>
          <TextField
            autoFocus
            label="List name"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>

        {/* Buttons at the bottom of the dialog */}
        <DialogActions>
          <Button onClick={() => setRenameOpen(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleRenameSave}
            disabled={!newName.trim() || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <AddMediaDialog
        open={addMediaOpen}
        onClose={() => setAddMediaOpen(false)}
        lists={lists}
        defaultListId={list.id}
        onAddMedia={onAddMedia}
      />
      <Dialog open={confirmationOpen} onClose={() => confirmationOpen(false)}>
        <DialogTitle>Delete list?</DialogTitle>
        <DialogContent>
          <DialogContentText>"{name}" will be deleted.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
