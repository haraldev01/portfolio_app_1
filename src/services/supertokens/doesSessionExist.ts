import Session from "supertokens-web-js/recipe/session";

export default async function doesSessionExist() {
  return await Session.doesSessionExist();
}
