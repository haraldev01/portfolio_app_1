"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope,
          );
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        },
      );
    }
  }, []);

  return null; // return null instead of an empty fragment
}
