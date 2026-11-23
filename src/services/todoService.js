import Parse from "./parse.js";

const TodoItem = Parse.Object.extend("MediaItem"); //R from to TodoItem to MediaItem

// may the current user change this object? asks its ACL
export function canWrite(parseObject) {
  const acl = parseObject.getACL();
  if (!acl) return true; // no ACL at all: everybody may write

  const user = Parse.User.current();
  return acl.getPublicWriteAccess() || acl.getWriteAccess(user);
}

// a row from the database, as  the components want to see it
function toTodo(item) {
  return {
    id: item.id,
    title: item.get("title"),
    creator: item.get("creator") || "",
    releaseYear: item.get("releaseYear") || "",
    pictureUrl: item.get("pictureUrl") || "",
    mediaType: item.get("mediaType") || "book",
    status: item.get("status") || "Interested",
    like: Boolean(item.get("like")),
    done: Boolean(item.get("done")),
    canWrite: canWrite(item),
  };
}

export async function loadTodos(list) {
  const results = await new Parse.Query(TodoItem)
    .equalTo("list", list)
    .ascending("createdAt")
    .find();

  return results.map(toTodo);
}

export async function addTodo(list, mediaData) { //R aggiunto mediaData
  const item = new TodoItem();

  item.set("title", mediaData.title || ""); 
  item.set("creator", mediaData.creator || "author unknown");
  item.set("releaseYear", mediaData.releaseYear ? String(mediaData.releaseYear) : null);
  item.set("pictureUrl", mediaData.pictureUrl || "");
  item.set("mediaType", mediaData.mediaType || "book");
  item.set("status", mediaData.status || "Interested");
  item.set("like", Boolean(mediaData.like));
  item.set("done", Boolean(mediaData.false))
  item.set("list", list);

  // the to-do follows its list: whoever may read the list may read the to-do
  item.setACL(list.getACL());

  return toTodo(await item.save());
}

export async function deleteTodo(id) {
  // we only have the id, so we build a stand-in object pointing at that row
  await TodoItem.createWithoutData(id).destroy();
}

export async function setDone(id, done) {
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  await item.save();
}
