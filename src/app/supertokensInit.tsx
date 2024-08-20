"use client";
import "client-only";

import SuperTokensWebJs from "supertokens-web-js";
import { frontendConfig } from "./config/frontend";

// only use this on client, hence "client-only".
SuperTokensWebJs.init(frontendConfig());

export default function SuperTokensInit() {
  return null;
}