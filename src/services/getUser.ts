import { faker } from "@faker-js/faker";
import "server-only";

export enum Identity {
  tf = "trans female",
  tm = "trans male",
  m = "male",
  f = "female",
  nb = "non-binary",
}

type socialLink = {
  text: string;
  link: string;
};

export type UserInformation = {
  username: string;
  displayName?: string;
  identity?: string;
  bio?: string;
  languages?: string[];
  socials?: socialLink[];
};

export default async function getUser({
  username,
}: {
  username: string;
}): Promise<UserInformation> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    username,
    displayName: faker.internet.displayName(),
    bio: faker.lorem.paragraphs({ min: 1, max: 3 }),
    identity: faker.helpers.arrayElement(Object.values(Identity)),
    languages: new Array(Math.ceil(Math.random() * 3))
      .fill(0)
      .map(() => faker.location.countryCode("alpha-2")),
    socials: [
      {
        link: "twitter.com/twitter",
        text: "my twitter link",
      },
      { link: "https://reddit.com/r/reddit", text: "my subreddit :)" },
      {
        link: "patreon.com/patreon",
        text: "Support me on Patreon!",
      },
      ...new Array(Math.ceil(Math.random() * 3) + 1).fill(0).map(() => {
        return { link: faker.internet.url(), text: faker.internet.userName() };
      }),
    ],
  };
}
