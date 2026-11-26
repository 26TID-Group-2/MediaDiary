import Parse from "./parse.js";

const List = Parse.Object.extend("List");
const MediaItem = Parse.Object.extend("MediaItem");
const ListMember = Parse.Object.extend("Contributor");

export async function loadMyLists() {
  return new Parse.Query(List).equalTo("owner", Parse.User.current()).find();
}

// the lists shared with me: one ListMember row per list
export async function loadSharedWithMe() {
  const rows = await new Parse.Query(ListMember)
    .equalTo("user", Parse.User.current())
    .include("list") // bring the list along, not only its id
    .include("list.owner") // and, through the list, who owns it
    .find();

  // a list its owner has deleted leaves a membership pointing at nothing
  return rows.filter((row) => row.get("list"));
}

// "Object not found": no such list, or its ACL does not let me read it
export async function loadList(listId) {
  return new Parse.Query(List).get(listId);
}

//mediaType is "Movie", "TV" or "Book"
export async function addList(name, mediaType) {
  const currentUser = Parse.User.current();

  const list = new List();
  list.set("name", name);
  list.set("mediaType", mediaType);
  list.set("owner", currentUser);
  list.setACL(new Parse.ACL(currentUser)); // only the owner, for now (who can read and modify the list)

  return list.save();
}

export async function shareList(list, username) {
  const friend = await new Parse.Query(Parse.User)
    .equalTo("username", username)
    .first(); // undefined if nobody has that username

  if (!friend) {
    throw new Error("No user with that name");
  }

  // 1. the security: the friend may read the list, and every to-do in it
  const acl = list.getACL() ?? new Parse.ACL(Parse.User.current());
  acl.setReadAccess(friend, true); // may read, not change
  list.setACL(acl);

  const mediaItems = await new Parse.Query(MediaItem)
    .equalTo("list", list)
    .find();
  mediaItems.forEach((item) => item.setACL(acl));

  // 2. the data: a row that says the friend is on the list
  const member = new ListMember();
  member.set("list", list);
  member.set("user", friend);

  // both of us may change this row: that is how the friend can leave
  const memberAcl = new Parse.ACL(Parse.User.current());
  memberAcl.setReadAccess(friend, true);
  memberAcl.setWriteAccess(friend, true);
  member.setACL(memberAcl);

  // one request, but not a transaction: if it fails halfway, they disagree
  await Parse.Object.saveAll([list, ...mediaItems, member]);
}

// deletes my row; the ACLs on the list and its to-dos still name me
export async function leaveList(membership) {
  await membership.destroy();
}

// the owner removes the list, its tasks, and every membership on it
// added from Mircea's code
export async function deleteList(list) {
  const mediaItems = await new Parse.Query(MediaItem)
    .equalTo("list", list)
    .find();
  // const members = await new Parse.Query(ListMember)
  //   .equalTo("list", list)
  //   .find();

  await Parse.Object.destroyAll([...mediaItems, list]);
  // ...members,
}

export async function renameList(list, newName) {
  const name = newName.trim();
  if (!name) {
    throw new Error("List name cannot be empty");
  }
  list.set("name", name);
  return list.save();
}
