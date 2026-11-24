import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchMediaItems,
  updateMediaItem,
  deleteMediaItem,
} from "../services/mediaService.js";

// Holds the media items of every list the app has looked at,
// as one object: { [listId]: [item, item, ...] }.
// App uses this once, and hands the items and handlers down to the pages.
export function useMediaItems(user, lists) {
  const [mediaByList, setMediaByList] = useState({});

  // which lists we have already asked the database for (so we ask only once)
  const requested = useRef(new Set());

  // Load the items of one list, unless that has already happened.
  const loadMedia = useCallback(async (listId) => {
    if (!listId || requested.current.has(listId)) return;
    requested.current.add(listId);
    try {
      const items = await fetchMediaItems(listId);
      setMediaByList((previous) => ({ ...previous, [listId]: items }));
    } catch (error) {
      requested.current.delete(listId); // allow another try
      alert(error.message);
    }
  }, []);

  // Load the items of all my lists (the ones not loaded yet).
  useEffect(() => {
    if (!user) return;
    lists.forEach((list) => loadMedia(list.id));
  }, [user, lists, loadMedia]);

  // Forget everything: App calls this on logout, so the next
  // person to log in never sees the previous person's items.
  function resetMedia() {
    requested.current.clear();
    setMediaByList({});
  }

  // An item was saved to a list (the + button, "Add media" in a list's menu,
  // or "Add to list" on a card).
  function handleAddMedia(listId, savedItem) {
    setMediaByList((previous) => {
      const current = previous[listId] ?? [];
      if (current.some((item) => item.id === savedItem.id)) return previous;
      return { ...previous, [listId]: [...current, savedItem] };
    });
  }

  // Save to the database first, then update the screen,
  // so a failed save never looks like it worked.
  async function handleSaveMedia(id, changes) {
    try {
      await updateMediaItem(id, changes);
      setMediaByList((previous) =>
        Object.fromEntries(
          Object.entries(previous).map(([listId, items]) => [
            listId,
            items.map((item) =>
              item.id === id ? { ...item, ...changes } : item,
            ),
          ]),
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRemoveMedia(id) {
    try {
      await deleteMediaItem(id);
      setMediaByList((previous) =>
        Object.fromEntries(
          Object.entries(previous).map(([listId, items]) => [
            listId,
            items.filter((item) => item.id !== id),
          ]),
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  return {
    mediaByList,
    loadMedia,
    resetMedia,
    handleAddMedia,
    handleSaveMedia,
    handleRemoveMedia,
  };
}
