import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

// These strings must match the values stored in Back4App exactly.
export const MEDIA_TYPES = ["Book", "Movie", "TV"];
export const STATUSES = ["Interested", "In Progress", "Finished"];

export const typeInfo = {
  Book: { icon: MenuBookOutlinedIcon, label: "Book" },
  Movie: { icon: MovieOutlinedIcon, label: "Movie" },
  TV: { icon: LiveTvOutlinedIcon, label: "TV" },
};

// Used when a row has a type we don't recognise, so one bad row
// doesn't crash the whole list.
export const unknownTypeInfo = {
  icon: HelpOutlineOutlinedIcon,
  label: "Unknown",
};
