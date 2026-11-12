import AddForm from "../components/AddForm.jsx";
import MyListRow from "../components/MyListRow.jsx";
import SharedListRow from "../components/SharedListRow.jsx";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import sampleMedia from "../data/sampleMedia.js";
import MediaList from "../components/MediaList.jsx";

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

      {lists.map((list) => (
        <MediaList key={list.id} name={list.get("name")} media={sampleMedia} />
      ))}

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

      <Typography variant="h5" sx={{ mt: 4 }}>
        List Manager
      </Typography>
      <AddForm onAdd={onAddList} buttonLabel="New list" />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Account
      </Typography>
      <button onClick={onLogout}>Logout</button>
    </Container>
  );
}
