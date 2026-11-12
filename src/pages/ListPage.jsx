import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadList } from "../services/listService.js";
import MediaList from "../components/MediaList.jsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import sampleMedia from "../data/sampleMedia.js";

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
    <>
      <Link to="/">← All lists</Link>

      {error ? (
        <p>{error}</p>
      ) : !list ? (
        <p>Loading…</p>
      ) : (
        <MediaList
          key={list.id}
          listId={list.id}
          name={list.get("name")}
          media={sampleMedia}
          layout="wrap"
        />
      )}
    </>
  );
}
