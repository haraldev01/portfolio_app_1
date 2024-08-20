import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";

export default async function isThisSameBrowserAndDevice() {
  return (await getLoginAttemptInfo()) !== undefined;
}
