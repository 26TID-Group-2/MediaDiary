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

//onLogout is a PROP: the logout function from App.jsx.
//App.jsx owns the logged-in user, so App.jsx is the one that logs out.
export default function ProfilePage({ onLogout }) {
  const [newPassword, setNewPassword] = useState("");

  //The second field, where the user types the new password again
  const [confirmPassword, setConfirmPassword] = useState("");

  //true when the user has started typing in the second field,
  //and it is not the same as the first. Used to show an error under the field.
  const passwordsDoNotMatch =
    confirmPassword !== "" && confirmPassword !== newPassword;

  //The message we show after saving
  const [message, setMessage] = useState(null);

  //Runs when the user clicks "Change password" or presses Enter.
  //"async" because saving to Parse takes time, and we wait for it with "await".
  async function handleSubmit(event) {
    //A form reloads the whole page by default. This stops that.
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "The two passwords do not match!" });
      return;
    }

    //try: attempt to save. If something goes wrong, catch runs instead.
    try {
      await changePassword(newPassword);
      setMessage({ type: "success", text: "Your password has been changed." });
      //Empty both fields again
      setNewPassword("");
      setConfirmPassword("");
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
          label="New Password"
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
        <TextField
          type="password"
          label="Repeat New Password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={passwordsDoNotMatch}
          helperText={
            passwordsDoNotMatch ? "The passwords are not the same!" : ""
          }
          //:not(.Mui-error) means "only when there is no error",
          //so the field stays red (not purple) when the passwords are not the same.
          sx={{
            "& label.Mui-focused:not(.Mui-error)": {
              color: "var(--color-primary)",
            },
            "& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "var(--color-primary)",
              },
          }}
        />

        {/* disabled while a field is empty, or while the two passwords are not the same.
            || means "or". */}
        <Button
          type="submit"
          variant="contained"
          disabled={newPassword === "" || confirmPassword === ""}
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
      {/* LOG OUT
          variant="outlined": a button with only a border, so it looks less
          important than "Change password" and is not pressed by mistake.
          onClick={onLogout}: no () - we give the function, we do not call it. */}
      <Typography variant="h5" component="h2" sx={{ mt: 6 }}>
        Log out
      </Typography>
      <Button
        variant="outlined"
        onClick={onLogout}
        sx={{
          mt: 2,
          color: "var(--color-primary-dark)",
          borderColor: "var(--color-primary)",
          "&:hover": {
            borderColor: "var(--color-primary-dark)",
            bgcolor: "var(--color-background)",
          },
        }}
      >
        Log out
      </Button>
    </Container>
  );
}
