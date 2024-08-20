import { createCode } from "supertokens-web-js/recipe/passwordless";

// from: https://supertokens.com/docs/passwordless/custom-ui/login-magic-link
export default async function sendMagicLink(email: string) {
  try {
    let response = await createCode({
      email,
    });

    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      window.alert(response.reason);
    } else {
      // Magic link sent successfully.
      window.alert("Please check your email for the magic link");
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you,
      // or if the input email / phone number is not valid.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}
