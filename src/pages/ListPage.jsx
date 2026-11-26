import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MediaList from "../components/MediaList.jsx";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useList } from "../hooks/useList.js";

export default function ListPage({
  lists,
  mediaByList,
  onLoadMedia,
  onAddMedia,
  onSaveMedia,
  onRemoveMedia,
}) {
  // the :listId part of the URL, e.g. /lists/Xk3v9QaB2c
  const { listId } = useParams();
  const { list, loading, error } = useList(listId);

  // a list I arrived at by link (not one of mine) may not be loaded yet
  useEffect(() => {
    onLoadMedia(listId);
  }, [listId, onLoadMedia]);

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
          items={mediaByList[list.id] ?? []}
          lists={lists}
          onAddMedia={onAddMedia}
          onSave={onSaveMedia}
          onRemove={onRemoveMedia}
          layout="wrap"
        />
      )}
    </Container>
  );
}
