import MediaCard from "./MediaCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ListOptionsMenu from "./ListOptionsMenu";

export default function MediaList({
  list,
  name,
  media,
  onAddMedia,
  layout = "scroll",
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component={Link}
        to={`/lists/${list.id}`}
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

      <ListOptionsMenu list={list} name={name} onAddMedia={onAddMedia} />

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
              year={item.releaseYear}
              favourite={item.liked}
              status={item.status}
              picture={item.pictureUrl}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
