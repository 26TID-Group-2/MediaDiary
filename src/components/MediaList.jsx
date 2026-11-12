import MediaCard from "./MediaCard";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function MediaList({ name, media }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2">
        {name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
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
