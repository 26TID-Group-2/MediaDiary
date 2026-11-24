import { useParams, Link } from "react-router-dom";
import MediaList from "../components/MediaList.jsx";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useList } from "../hooks/useList.js";

export default function ListPage({ lists, mediaByList, onAddMedia }) {
  // the :listId part of the URL, e.g. /lists/Xk3v9QaB2c
  const { listId } = useParams();
  const { list, loading, error } = useList(listId);

  return (
    <Container sx={{ py: 3 }}>
      <Button
        component={Link}
        to={"/"}
        startIcon={<KeyboardBackspaceIcon />}
        color="primary"
        size="large"
        sx={{ textTransform: "none" }}
      >
        All lists
      </Button>

      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading…</p>
      ) : (
        <MediaList
          list={list}
          name={list.get("name")}
          media={mediaByList[list.id] ?? []}
          onAddMedia={onAddMedia}
          layout="wrap"
        />
      )}
    </Container>
  );
}
