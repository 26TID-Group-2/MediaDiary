import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddFriendForm from "../components/AddFriendForm";

const sampleFriends = [
  { id: "1", username: "avery" },
  { id: "2", username: "hassan" },
  { id: "3", username: "johanne" },
  { id: "3", username: "ruta" },
];
export default function FriendsPage({ lists, handleAddFriend }) {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1">
        Friends
      </Typography>

      {/* Adding new friends */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          Add a friend
        </Typography>
        <AddFriendForm onAddFriend={handleAddFriend} />
      </Box>
      {/* Display the user's friends */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          My Friends
        </Typography>

        {sampleFriends.map((friend) => (
          <Typography key={friend.id} sx={{ mt: 2 }}>
            @{friend.username}
          </Typography>
        ))}
      </Box>

      {/* Friends' media lists */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2">
          Friends' Lists
        </Typography>
      </Box>
    </Container>
  );
}
