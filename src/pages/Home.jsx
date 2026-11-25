import SharedListRow from "../components/SharedListRow.jsx";
import AddListCard from "../components/AddListCard.jsx";
import { Box } from "@mui/material";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MediaList from "../components/MediaList.jsx";
import AddMediaModal from "../components/AddMediaModal.jsx";

// the home page: every list, by name, each one a link to its own page
export default function Home({
  lists,
  memberships,
  onAddList,
  onShare,
  onLeave,
  onLogout,
  mediaByList,
  onAddMedia,
  onSaveMedia,
  onRemoveMedia,
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
            list={list}
            name={list.get("name")}
            items={mediaByList[list.id] ?? []}
            lists={lists}
            onAddMedia={onAddMedia}
            onSave={onSaveMedia}
            onRemove={onRemoveMedia}
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

      {/* The floating + button in the bottom right corner, for adding media to a list */}
      <AddMediaModal lists={lists} onMediaItemAdded={onAddMedia} />

      <Typography variant="h5" sx={{ mt: 4 }}>
        Account
      </Typography>
      <button onClick={onLogout}>Logout</button>
    </Container>
  );
}
