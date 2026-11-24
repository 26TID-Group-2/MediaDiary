import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddFriendForm(onAddFriend) {
  let [user, setUser] = useState("");

  function onButtonClick(event) {
    event.preventDefault();
    onAddFriend(user);
    setUser("");
  }

  return (
    <form onSubmit={onButtonClick}>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField label="Username" size="small" />

        <Button variant="contained">Add friend</Button>
      </Box>
    </form>
  );
}
