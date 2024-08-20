import React from "react";

export default function UserLayout({
  tabs,
  userInformation,
}: {
  tabs: React.ReactNode;
  userInformation: React.ReactNode;
}) {
  return (
    <>
      {userInformation}
      {tabs}
    </>
  );
}
