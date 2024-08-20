import {
  consumeCode,
  clearLoginAttemptInfo,
} from "supertokens-web-js/recipe/passwordless";

export default async function handleMagicLinkClicked() {
  try {
    let response = await consumeCode();

    if (response.status === "OK") {
      // we clear the login attempt info that was added when the createCode function
      // was called since the login was successful.
      await clearLoginAttemptInfo();
      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        // user sign up success
      } else {
        // user sign in success
      }
      window.location.assign("/home");
    } else {
      // this can happen if the magic link has expired or is invalid
      // or if it was denied due to security reasons in case of automatic account linking

      // we clear the login attempt info that was added when the createCode function
      // was called - so that if the user does a page reload, they will now see the
      // enter email / phone UI again.
      await clearLoginAttemptInfo();
      window.alert("Login failed. Please try again");
      window.location.assign("/auth");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}
