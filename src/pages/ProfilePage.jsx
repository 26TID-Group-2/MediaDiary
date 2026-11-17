import { useState } from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//Alert is a coloured box for messsages. Green = success. Red = error
import Alert from "@mui/material/Alert";

//Our own methods
import { currentUser, changePassword } from "../services/authService.js";

export default function ProfilePage() {
  const [newPassword, setNewPassword] = useState("");

  //The message we show after saving
  const [message, setMessage] = useState(null);

  //Runs when the user clicks "Change password" or presses Enter.
  //"async" because saving to Parse takes time, and we wait for it with "await".
  async function handleSubmit(event) {
    //A form reloads the whole page by default. This stops that.
    event.preventDefault();

    //try: attempt to save. If something goes wrong, catch runs instead.
    try {
      await changePassword(newPassword);
      setMessage({ type: "success", text: "Your password has been changed." });
      //Empty the field again
      setNewPassword("");
    } catch (error) {
      //error.message is the text Parse sends back, for example "Permission denied"
      setMessage({ type: "error", text: error.message });
    }
  }

  return (
    <Container sx={{ py: 4, maxWidth: 480 }}>
      <Link to="/">Back to My List</Link>

      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
        {" "}
        My Profile
      </Typography>

      <Typography sx={{ mt: 1, color: "var(--color-text-secondary)" }}>
        Logged in as {currentUser().getUsername()}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
          Change Password
        </Typography>

        {/* A controlled component, like in AddListCard.
            type="password" hides the text with dots while the user types. */}
        <TextField
          type="password"
          label="New password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          sx={{
            "& label.Mui-focused": { color: "var(--color-primary)" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--color-primary)",
              },
          }}
        />
        {/* disabled while the field is empty, so you cannot save an empty password */}
        <Button
          type="submit"
          variant="contained"
          disabled={newPassword === ""}
          sx={{
            bgcolor: "var(--color-primary)",
            "&:hover": { bgcolor: "var(--color-primary-dark)" },
          }}
        >
          Change password
        </Button>
      </form>

      {/* CONDITIONAL RENDERING with && (week 2):
          the Alert is only shown when there is a message.
          severity decides the colour and the icon: green tick for success, red cross for error.
          So the message is never shown with colour alone. */}
      {message && (
        <Alert severity={message.type} sx={{ mt: 3 }}>
          {message.text}
        </Alert>
      )}
    </Container>
  );
}
