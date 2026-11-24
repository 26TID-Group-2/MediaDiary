import "./styling/App.css";
import Home from "./pages/Home.jsx";
import ListPage from "./pages/ListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthPage from "./pages/AuthPage.jsx";
import { currentUser, logOut } from "./services/authService.js";
import {
  loadMyLists,
  loadSharedWithMe,
  addList,
  shareList,
  leaveList,
} from "./services/listService.js";
import { loadTodos } from "./services/todoService.js";

import NavAppBar from "./components/NavAppBar.jsx";

function App() {
  const [user, setUser] = useState(currentUser());
  const [lists, setLists] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [mediaByList, setMediaByList] = useState({});

  //loeads the media items already in the database when lists load or change
  useEffect(() => {
    async function fetchMedia() {
      const nextMediaByList = {};
      for (const list of lists) {
        nextMediaByList[list.id] = await loadTodos(list);
      }
      setMediaByList(nextMediaByList);
    }

    fetchMedia();
  }, [lists]);

  useEffect(() => {
    // nobody logged in yet: nothing to load
    if (!user) return;

    async function loadLists() {
      setLists(await loadMyLists());
      setMemberships(await loadSharedWithMe());
    }

    loadLists();
  }, [user]); // load again whenever somebody else logs in

  //mediaType is "Movie", "TV" or "Book", chosen in AddListCard
  async function handleAddList(name, mediaType) {
    try {
      const savedList = await addList(name, mediaType);
      setLists([...lists, savedList]);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleShare(list, username) {
    try {
      await shareList(list, username);
      alert(`Shared ${list.get("name")} with ${username}`);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLeave(membership) {
    try {
      await leaveList(membership);
      setMemberships(memberships.filter((each) => each.id !== membership.id));
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLogout() {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      alert(error);
    }
  }

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  function handleAddMedia(listId, savedMediaItem) {
    setMediaByList((previous) => ({
      ...previous,

      [listId]: [...(previous[listId] ?? []), savedMediaItem],
    }));
  }

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <>
      <NavAppBar onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              lists={lists}
              memberships={memberships}
              onAddList={handleAddList}
              onShare={handleShare}
              onLeave={handleLeave}
              onLogout={handleLogout}
              mediaByList={mediaByList}
              onAddMedia={handleAddMedia}
            />
          }
        />
        <Route
          path="/lists/:listId"
          element={
            <ListPage
              lists={lists}
              mediaByList={mediaByList}
              onAddMedia={handleAddMedia}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage onLogout={handleLogout} />}
        />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="*" element={<Link to="/">No such page</Link>} />
      </Routes>
    </>
  );
}

export default App;
