import AddMedia from "./AddMedia";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function AddMediaDialog({
  open,
  onClose,
  lists,
  defaultListId,
  initialItem,
  onAddMedia,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      // targets the white box inside the modal
      paperprops={{
        borderRadius: "var(--radius)",
      }}
    >
      <DialogTitle className="typography-title" color="primary">
        Add New Media
      </DialogTitle>

      <DialogContent>
        {" "}
        {/* renders the form inside, passing down the lists and the close function*/}
        <AddMedia
          lists={lists}
          onClose={onClose}
          defaultListId={defaultListId}
          initialItem={initialItem}
          onAddMedia={onAddMedia}
        />
      </DialogContent>
    </Dialog>
  );
}
