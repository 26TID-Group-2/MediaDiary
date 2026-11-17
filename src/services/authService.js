import Parse from "./parse.js";

// the user who is logged in, or null
export function currentUser() {
  return Parse.User.current();
}

export async function signUp(username, password) {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  await user.signUp();

  // others must be able to find me by username, to share with me
  const acl = new Parse.ACL(user);
  acl.setPublicReadAccess(true);
  user.setACL(acl);
  await user.save();

  return user;
}

export async function logIn(username, password) {
  return Parse.User.logIn(username, password);
}

export async function logOut() {
  await Parse.User.logOut();
}

//Changes the password of the user that's currently logged in
//Parse hashes the new password automatically, so it is never stored as plain text.

//"async" in front of the function means: this function does something that TAKES TIME
//(here: sending the new password over the internet to Parse and waiting for an answer).
//A function marked with async is allowed to use "await" inside it.
export async function changePassword(newPassword) {
  //Get the user who is logged in right now.
  //This is instant, because Parse already remembers the user in the browser, so no await is needed.
  const user = Parse.User.current();

  //Change the password on the user object.
  //This only changes it here in the browser. Nothing has been sent to the database yet.
  user.set("password", newPassword);

  //Send the change to the database.
  //"await" means: WAIT here until Parse answers, before going on to the next line.
  //Without await, the function would finish straight away, before the password was saved,
  //and we would not know whether it worked.
  //If Parse answers with an error, await throws that error,
  //so the try/catch on the Profile page can catch it and show it to the user.
  await user.save();
}
