//A card that looks like a MediaCard, but with a big plus.
//When the user clicks it, a dialog opens where they can type the name of a new list.

//useState lets the component remember things that can change,
//like whether the dialog is open and what the user has typed.
import { useState } from "react";

//Building blocks from MUI

//Card is the white box with rounded corners. It decides how the card LOOKS.
import Card from "@mui/material/Card";

//CardActionArea turns everything inside the card into one big button,
//so the card can be CLICKED (mouse, touch or keyboard).
import CardActionArea from "@mui/material/CardActionArea";

//Shows text with our font and sizes
import Typography from "@mui/material/Typography";

//Dialog is the pop-up window.
//It has three parts: DialogTitle (the heading), DialogContent (the middle)
//and DialogActions (the buttons at the bottom).
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

//A normal MUI button, used for Cancel and Create
import Button from "@mui/material/Button";

//TextField is MUI's input field. Its label stays visible above the field while the user types.
import TextField from "@mui/material/TextField";

//The plus icon
import AddIcon from "@mui/icons-material/Add";

//onAddList is a PROP: a function the page gives us.
//We call it with the new name, and the page saves the list in Parse.
//The card does not talk to Parse itself: the page owns the lists (week 2).
export default function AddListCard({ onAddList }) {
  //STATE 1: is the dialog open? It starts as false, which means closed.
  const [isOpen, setIsOpen] = useState(false);

  //STATE 2: the text the user has typed in the field. It starts empty.
  const [name, setName] = useState("");

  //Runs when the card is clicked. Setting isOpen to true opens the dialog.
  function handleOpen() {
    setIsOpen(true);
  }

  //Runs when the user clicks Cancel, clicks outside the dialog or presses Esc.
  function handleClose() {
    //Close the dialog
    setIsOpen(false);
    //Empty the text field, so it's empty the next time the dialog opens
    setName("");
  }

  //Runs when the form is submitted: when the user clicks Create or presses Enter.
  function handleSubmit(event) {
    //A form reloads the whole page by default. This stops that.
    event.preventDefault();

    //.trim() removes spaces at the start and end, so "   " does not count as a name.
    const trimmedName = name.trim();
    //If the name is empty, stop here. return ends the function.
    if (trimmedName === "") return;

    //Give the name to the page, which saves the list in Parse.
    onAddList(trimmedName);
    //Close the dialog and empty the field.
    handleClose();
  }

  return (
    //A fragment <>...</> lets us return TWO things (the card and the dialog)
    //without adding an extra box to the page.
    <>
      {/* THE CARD - the white box with the rounded corners */}
      <Card
        sx={{
          width: 280, //Width of the card (same as a MediaCard)
          minHeight: 280, //Minimum height of the card
          alignSelf: "stretch", //It stretches to match the highest card - might be removed if we dont have the size of the cards be different
          display: "flex", //Makes the card a "flex box", which lets the button inside it grow. Works together with flexGrow: 1 on CardActionArea below.
          borderRadius: "var(--radius)", //Rounded corners
          border: "2px dashed var(--color-primary)", //Dashed purple border, shows that this is an empty slot
          bgcolor: "var(--color-surface)", //White background
          boxShadow: "none", //No shadow, so it looks flatter than the real cards
        }}
      >
        {/* THE BUTTON - makes the card act like a button.
            You can click wherever you want on the card. */}
        <CardActionArea
          onClick={handleOpen} //When the card is clicked, open the dialog (no () - we give the function, we do not call it)
          sx={{
            flexGrow: 1, //Makes the button as big as the whole card
            display: "flex", //The button is also a flex box, so it can arrange the plus and the text
            flexDirection: "column", //Place the plus and the text under each other
            alignItems: "center", //Center them horizontally
            justifyContent: "center", //Center them vertically
            gap: 1, //Space between the plus and the text (8 pixels)
          }}
        >
          {/* The plus icon. aria-hidden=true tells the screen readers to skip it - "Add list" already says what the button does */}
          <AddIcon
            sx={{ fontSize: 56, color: "var(--color-primary)" }}
            aria-hidden="true"
          />

          {/* The text on the button.
              variant="h6" makes it LOOK like a small heading.
              component="span" makes it plain text, because it is just a label on a button. */}
          <Typography
            variant="h6"
            component="span"
            sx={{ color: "var(--color-primary-dark)" }}
          >
            Add list
          </Typography>
        </CardActionArea>
      </Card>

      {/* THE DIALOG
          open={isOpen}: the dialog is only visible when isOpen is true.
          onClose={handleClose}: runs when the user clicks outside the dialog or presses Esc.
          fullWidth + maxWidth="xs": as wide as possible, but never wider than "extra small".
          MUI moves the keyboard focus into the dialog when it opens,
          and back to the card when it closes. */}
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
        {/* THE FORM
            Because the field and the buttons are inside a form,
            pressing Enter in the field submits it, just like clicking Create (week 2).
            onSubmit tells the form which function to run when it is submitted. */}
        <form onSubmit={handleSubmit}>
          {/* The heading of the dialog */}
          <DialogTitle>Create a new list</DialogTitle>

          {/* The middle of the dialog */}
          <DialogContent>
            {/* A CONTROLLED COMPONENT (week 2):
                value={name} - the field always shows what is in the name state.
                onChange - every key press saves the new text in name with setName.
                event.target is the text field, and event.target.value is the text in it right now.
                So React always knows exactly what is in the field. */}
            <TextField
              autoFocus //Put the cursor in the field as soon as the dialog opens
              fullWidth //The field is as wide as the dialog
              margin="dense" //A little space above the field
              label="List name" //The label above the field
              value={name}
              onChange={(event) => setName(event.target.value)}
              //Without this, MUI colours the field blue when it is selected.
              //These lines make the label and the border purple instead.
              sx={{
                //The label, when the field is selected
                "& label.Mui-focused": { color: "var(--color-primary)" },
                //The border, when the field is selected
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "var(--color-primary)",
                  },
              }}
            />
          </DialogContent>

          {/* The buttons at the bottom of the dialog */}
          <DialogActions>
            {/* Cancel closes the dialog without saving anything */}
            <Button
              onClick={handleClose}
              sx={{ color: "var(--color-primary-dark)" }}
            >
              Cancel
            </Button>

            {/* Create saves the list.
                type="submit": this button submits the form, so handleSubmit runs.
                variant="contained": a filled button, so it stands out from Cancel.
                disabled: the button cannot be clicked while the field is empty
                (or only contains spaces). */}
            <Button
              type="submit"
              variant="contained"
              disabled={name.trim() === ""}
              sx={{
                bgcolor: "var(--color-primary)", //Purple button
                "&:hover": { bgcolor: "var(--color-primary-dark)" }, //Darker purple when hovered
              }}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
