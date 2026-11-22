import MediaCard from "./MediaCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaList({ listId, name, media, layout = "scroll" }) {
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
              type={item.mediaType} //map back4app mediatype to card type prop
              creator={item.creator}
              year={item.releaseyear}
              favourite={item.like}
              status={item.status}
              picture={item.pictureUrl}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}