import Parse from "./parse.js";

const MediaItem = Parse.Object.extend("MediaItem");
const List = Parse.Object.extend("List");

// may the current user change this object? asks its ACL
export function canWrite(parseObject) {
  const acl = parseObject.getACL();
  if (!acl) return true; // no ACL at all: everybody may write

  const user = Parse.User.current();
  return acl.getPublicWriteAccess() || acl.getWriteAccess(user);
}

// the only place that knows the database column names
function toPlainMediaItem(parseObject) {
  const list = parseObject.get("list");
  return {
    id: parseObject.id,
    title: parseObject.get("title"),
    creator: parseObject.get("creator") ?? [],
    type: parseObject.get("mediaType"),
    pictureUrl: parseObject.get("pictureUrl"),
    releaseYear: parseObject.get("releaseYear"),
    status: parseObject.get("status"),
    liked: parseObject.get("liked"),
    listId: list ? list.id : null,
    canWrite: canWrite(parseObject),
  };
}

export async function fetchMediaItems(listId) {
  if (!listId) return [];
  const results = await new Parse.Query(MediaItem)
    .equalTo("list", List.createWithoutData(listId))
    .ascending("createdAt")
    .find();
  return results.map(toPlainMediaItem);
}

export async function addMediaItem(
  listId,
  { title, creator, type, pictureUrl, releaseYear, status, liked },
) {
  const item = new MediaItem();
  item.set("list", List.createWithoutData(listId));
  item.set("title", title);
  item.set("creator", creator);
  item.set("mediaType", type);
  item.set("pictureUrl", pictureUrl);
  item.set("releaseYear", releaseYear);
  item.set("status", status);
  item.set("liked", liked);

  // TODO(ACL): needs the group's decision on list permissions
  // (owner / contributor / follower) before this can be set correctly.
  // item.setACL(...)

  return toPlainMediaItem(await item.save());
}

export async function updateMediaItem(id, { status, liked }) {
  const item = MediaItem.createWithoutData(id);
  if (status !== undefined) item.set("status", status);
  if (liked !== undefined) item.set("liked", liked);
  await item.save();
}

export async function deleteMediaItem(id) {
  // we only have the id, so we build a stand-in object pointing at that row
  await MediaItem.createWithoutData(id).destroy();
}
