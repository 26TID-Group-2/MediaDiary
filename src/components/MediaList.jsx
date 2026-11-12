import MediaCard from "./MediaCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaList({ listId, name, media, layout = "scroll" }) {
  console.log("MediaList received ID:", listId);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component={Link}
        to={`/lists/${listId}`}
        sx={{
          color: "text.primary",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: layout === "wrap" ? "wrap" : "nowrap",
          overflowX: layout === "wrap" ? "visible" : "auto",
          py: 2,
        }}
      >
        {media.map((item) => (
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
  );
}
