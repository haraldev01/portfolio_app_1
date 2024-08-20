import { getLoginAttemptInfo } from "supertokens-web-js/recipe/passwordless";

export default async function hasInitialMagicLinkBeenSent() {
  return (await getLoginAttemptInfo()) !== undefined;
}
