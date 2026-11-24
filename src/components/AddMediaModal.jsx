// pop up class

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material"; //material ui component
import AddMedia from "./AddMedia";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddMediaDialog from "./AddMediaDialog";

export default function AddMediaModal({ lists, onMediaItemAdded }) {
  // Receive lists as a prop from the parent component, Home and passit down to AddMedia
  const [open, setOpen] = useState(false); // state to track whether the modal is open or closed

  return (
    <>
      {/* floating button */}
      <Fab
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "var(--color-primary)",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "var(--color-primary-dark)",
          },
        }}
      >
        <AddIcon />
      </Fab>
      <AddMediaDialog
        open={open}
        onClose={() => setOpen(false)}
        lists={lists}
        onAddMedia={onMediaItemAdded}
      />
    </>
  );
}
