import AddForm from "../components/AddForm.jsx";
import MyListRow from "../components/MyListRow.jsx";
import SharedListRow from "../components/SharedListRow.jsx";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MediaCard from "../components/MediaCard.jsx";
import sampleMedia from "../data/sampleMedia.js";

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
      {/* Go through every list belonging to the user */}
      {lists.map((list) => (
        // One section for each custom list
        <Box key={list.id} sx={{ mt: 4 }}>
          {/* Display the custom list name */}
          <Typography variant="h5" component="h2">
            {list.get("name")}
          </Typography>

          {/* Horizontally scrollable area for MediaCards */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              py: 2,
            }}
          >
            {/* Go through our sample media and create one card per item */}
            {sampleMedia.map((item) => (
              <Box key={item.id} sx={{ flexShrink: 0 }}>
                <MediaCard
                  title={item.title}
                  type={item.type}
                  creator={item.creator}
                  year={item.year}
                  status={item.status}
                  favourite={item.favourite}
                />
              </Box>
            ))}
          </Box>
        </Box>
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
