import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadList } from "../services/listService.js";
import MediaList from "../components/MediaList.jsx";
import Container from "@mui/material/Container";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";

export default function ListPage() {
  // the :listId part of the URL, e.g. /lists/Xk3v9QaB2c
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setList(await loadList(listId));
      } catch (err) {
        // "Object not found": no such list, or its ACL does not let me read it
        setError(err.message);
      }
    }

    load();
  }, [listId]);

  return (
    <Container sx={{ py: 3 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<KeyboardBackspaceIcon />}
        color="primary"
        size="large"
        sx={{ textTransform: "none" }}
      >
        All lists
      </Button>

      {error ? (
        <p>{error}</p>
      ) : !list ? (
        <p>Loading…</p>
      ) : (
        <MediaList
          key={list.id}
          listId={list.id}
          name={list.get("name")}
          layout="wrap"
        />
      )}
    </Container>
  );
}
