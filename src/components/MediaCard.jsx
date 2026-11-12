//Our list item component. One card that shows a movie, tv show or book.
//It's a reusable building block - we just write it once, and App uses it once for every item in our list.

import { useState } from "react";

//Building blocks from MUI

//Card is the actual white box with rounded corners and a shadow
import Card from "@mui/material/Card";

//CardContent adds padding (white space) around the text inside the Card.
import CardContent from "@mui/material/CardContent";

//Box is an empty Box. We use it to group and position things.
//like a <div> in HTML, but it can be styled with sx
import Box from "@mui/material/Box";

//Shows text with our font and sizes
import Typography from "@mui/material/Typography";

//Chip is the small rounded labels we're using as status tags (like "In Progress")
import Chip from "@mui/material/Chip";

//IconButton is a button that shows an icon instead of text****
import IconButton from "@mui/material/IconButton";

//Icons from MUI

// One icon for each media type (book, movie, TV).
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"; //Book icon
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined"; //Movie icon
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined"; //TV icon

// The image icon used as a placeholder until we have real covers.
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

// The two hearts: outlined (not favourite) and filled (favourite).
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// The "..." icon.
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

//Menu is the small pop-up list that opens when you click the "..." button.
//MenuItem is one option inside that list.
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// typeInfo connects each media type to its icon and a readable word.
// The names Book, Movie and TV must be written EXACTLY like the
// "type" values in sampleMedia.js, otherwise the card cannot find them.
const typeInfo = {
  Book: { icon: MenuBookOutlinedIcon, label: "Book" },
  Movie: { icon: MovieOutlinedIcon, label: "Movie" },
  TV: { icon: LiveTvOutlinedIcon, label: "TV" },
};

//All the statuses a card can have.
//They must be spelled EXACTLY like the status values in sampleMedia.js.
const statuses = ["Interested", "In Progress", "Finished"];

//The MediaCard component itself.
//The values inside {} are the PROPS - the information App gives to the card.
//Writing them like this takes them straight out. That means we can just write year instead of props.year
function MediaCard({ title, type, creator, year, status, favourite }) {
  //Look up the right icon for this card's type.
  //For example, if the card's type is Movie TypeIcon becomes MovieOutlinedIcon
  const TypeIcon = typeInfo[type].icon;

  // STATE: the card's own memory of whether it is a favourite.
  // useState(favourite) creates the memory and fills it with the
  // starting value from the prop (true or false from sampleMedia).
  // It gives us back two things, which we name ourselves:
  //   isFavourite    -> the current value (true or false)
  //   setIsFavourite -> the function we call to change the value
  const [isFavourite, setIsFavourite] = useState(favourite);

  // The card's own memory of its current status.
  // It starts with the status from sampleMedia, for example "Finished".
  const [currentStatus, setCurrentStatus] = useState(status);

  // Which element the menu is attached to.
  // MUI needs to know WHERE on the screen to open the menu, so we
  // remember the "..." button that was clicked.
  // null means "nothing", so the menu starts closed.
  const [menuAnchor, setMenuAnchor] = useState(null);

  // This is true when the menu should be open, and false when it is closed.
  // menuAnchor !== null means "menuAnchor is not nothing"
  const isMenuOpen = menuAnchor !== null;

  // This function runs every time the heart is clicked.
  // Calling setIsFavourite saves the new value
  // React then redraws the card, so the other heart is shown.
  function handleFavouriteClick() {
    setIsFavourite(!isFavourite);
  }

  // Runs when the "..." button is clicked.
  // React automatically gives the function an "event" object with
  // information about the click. event.currentTarget is the button
  // that was clicked. Saving it in state opens the menu next to it.
  function handleMenuOpen(event) {
    setMenuAnchor(event.currentTarget);
  }

  // Runs when the menu should close (clicking outside it or pressing Esc).
  // Setting the anchor back to null closes the menu.
  function handleMenuClose() {
    setMenuAnchor(null);
  }

  // Runs when the user picks a status in the menu.
  // It saves the new status and closes the menu.
  function handleStatusChange(newStatus) {
    setCurrentStatus(newStatus);
    setMenuAnchor(null);
  }

  return (
    //The whole card - sx sets its width to 280 pixels
    <Card sx={{ width: 280 }}>
      {/* Cover placeholder: a grey box with an image icon in the middle.
          display: "flex" + alignItems + justifyContent is the standard
          way to centre something both vertically and horizontally. */}
      <Box
        sx={{
          height: 160,
          bgcolor: "grey.600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageOutlinedIcon sx={{ fontSize: 48, color: "white" }} />
      </Box>

      <CardContent>
        {/* TOP ROW: text on the left, heart on the right.
        justifyContent: "space-between" pushes them apart. */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {/* Left side: icon + title, and creator + year below. */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* titleAccess gives the icon a text that screen readers
                  read aloud, for example "Movie". */}
              <TypeIcon
                sx={{ color: "primary.dark" }}
                titleAccess={typeInfo[type].label}
              />
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: "primary.dark" }}
              >
                {title}
              </Typography>
            </Box>
            {/* creator is a list, so .join(", ") turns
                ["Marta Kauffman", "David Crane"] into
                "Marta Kauffman, David Crane". */}
            <Typography variant="body2" color="text.secondary">
              {creator.join(", ")}, {year}
            </Typography>
          </Box>
          {/* The heart button.
              onClick tells the button which function to run when it is
              clicked (or pressed with Enter or Space on the keyboard).
              Note: we write handleFavouriteClick WITHOUT ( ), because we
              give the button the function to run later, on click.
              With ( ) it would run immediately when the card is drawn.

              aria-label is the text a screen reader reads aloud.

              aria-pressed tells a screen reader whether the button is
              currently "on" (favourite) or "off".

              The hearts use isFavourite (the state) instead of the
              favourite prop, so they change when the user clicks. */}

          <IconButton
            onClick={handleFavouriteClick}
            aria-pressed={isFavourite}
            aria-label={
              isFavourite
                ? `Remove ${title} from favourites`
                : `Add ${title} to favourites`
            }
          >
            {isFavourite ? (
              <FavoriteIcon sx={{ color: "primary.main" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        </Box>

        {/* BOTTOM ROW: status tag on the left, "..." on the right.
         mt: 2 adds space above this row (2 x 8 = 16 pixels). */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* The status tag shows currentStatus (the state). 
            So, it changes if the user picks a new status */}
          <Chip
            label={currentStatus}
            size="small"
            sx={{ bgcolor: "background.default" }}
          />

          <IconButton
            aria-label={`More options for ${title}`}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={handleMenuOpen}
          >
            <MoreHorizIcon />
          </IconButton>
          {/* The menu itself. It is invisible until open is true.
              anchorEl = the element the menu is attached to (the "..." button).
              onClose = what to do when the user clicks outside or presses Esc.
              MUI handles keyboard support for us: arrow keys move between
              the options, Enter picks one, and Esc closes the menu. */}
          <Menu
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            {statuses.map((option) => (
              <MenuItem
                key={option}
                selected={option === currentStatus}
                onClick={() => handleStatusChange(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MediaCard;
