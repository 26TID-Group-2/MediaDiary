import { loadList } from "../services/listService";
import { useEffect, useState } from "react";

export function useList(listId) {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        setList(await loadList(listId));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    load();
  }, [listId]);
  return { list, loading, error };
}
