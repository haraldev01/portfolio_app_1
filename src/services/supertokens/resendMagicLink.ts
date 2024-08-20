import {
  resendCode,
  clearLoginAttemptInfo,
} from "supertokens-web-js/recipe/passwordless";

// from: https://supertokens.com/docs/passwordless/custom-ui/login-magic-link
export default async function resendMagicLink() {
  try {
    let response = await resendCode();

    if (response.status === "RESTART_FLOW_ERROR") {
      // this can happen if the user has already successfully logged in into
      // another device whilst also trying to login to this one.

      // we clear the login attempt info that was added when the createCode function
      // was called - so that if the user does a page reload, they will now see the
      // enter email / phone UI again.
      await clearLoginAttemptInfo();
      window.alert("Login failed. Please try again");
      window.location.assign("/auth");
    } else {
      // Magic link resent successfully.
      window.alert("Please check your email for the magic link");
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
