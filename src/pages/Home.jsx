import AddForm from "../components/AddForm.jsx";
import MyListRow from "../components/MyListRow.jsx";
import SharedListRow from "../components/SharedListRow.jsx";
import AddListCard from "../components/AddListCard.jsx";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import sampleMedia from "../data/sampleMedia.js";
import MediaList from "../components/MediaList.jsx";
import Box from "@mui/material/Box";

// the home page: every list, by name, each one a link to its own page
export default function Home({
  lists,
  memberships,
  onAddList,
  onShare,
  onLeave,
  onLogout,
}) {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1">
        My lists
      </Typography>

      {lists.map((list) => {
        return (
          <MediaList
            key={list.id}
            listId={list.id}
            name={list.get("name")}
            media={sampleMedia}
          />
        );
      })}

      {memberships.length > 0 && (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Shared with me
        </Typography>
      )}
      {memberships.map((membership) => (
        <SharedListRow
          key={membership.id}
          membership={membership}
          onLeave={onLeave}
        />
      ))}

      {/* The card for creating a new list.
          onAddList comes from App.jsx, and saves the new list in Parse. */}
      <Box sx={{ mt: 4 }}>
        <AddListCard onAddList={onAddList} />
      </Box>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Account
      </Typography>
      <button onClick={onLogout}>Logout</button>
    </Container>
  );
}
