import PasswordlessWebJs from "supertokens-web-js/recipe/passwordless";
import SessionWebJs from "supertokens-web-js/recipe/session";
import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-web-js/types";
import eventEmitter from "@/utils/eventEmitter";

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      PasswordlessWebJs.init(),
      SessionWebJs.init({
        onHandleEvent: async (context) => {
          if (context.action === "SESSION_CREATED") {
            eventEmitter.emit("SESSION_CREATED");
          } else if (context.action === "SIGN_OUT") {
            eventEmitter.emit("SIGN_OUT");
          }
        },
      }),
    ],
  };
};
