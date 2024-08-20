import "server-only";

import { ScriptPost, PostType } from "@/types/post";
import { faker } from "@faker-js/faker";
import { Identity } from "./getUser";

// Function overloads
export default async function getScriptPost(
  audioId: string,
): Promise<ScriptPost>;
export default async function getScriptPost(
  username: string,
  audioSlug: string,
): Promise<ScriptPost>;

// Implementation of the function
export default async function getScriptPost(
  arg1: string,
  arg2?: string,
): Promise<ScriptPost> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const scriptId = arg1;
  const username = arg1;
  const scriptSlug = arg2;

  const isUsingScriptId = arg2 == undefined;

  return {
    postType: PostType.Script,
    scriptId: isUsingScriptId ? scriptId : faker.string.uuid(),
    wordCount: Math.ceil(Math.random() * 1000),
    audience: `${"F".repeat(Math.ceil(Math.random() * 3))}4M`,
    language: faker.location.countryCode("alpha-2"),
    secondaryLanguage:
      Math.random() > 0.5 ? faker.location.countryCode("alpha-2") : undefined,
    tags: new Array(Math.ceil(Math.random() * 20))
      .fill(0)
      .map(() => faker.music.genre()),
    name: faker.music.songName(),
    description: faker.lorem.paragraphs(2),
    author: {
      displayName: faker.internet.displayName(),
      username: !isUsingScriptId ? username : faker.internet.userName(),
      identity: faker.helpers.arrayElement(Object.values(Identity)),
    },
    coAuthors: new Array(Math.ceil(Math.random() * 10)).fill(0).map(() => ({
      displayName: faker.internet.displayName(),
      username: faker.internet.userName(),
      identity: faker.helpers.arrayElement(Object.values(Identity)),
    })),
    isUnfilled: Math.random() > 0.5,
    createdAt: faker.date.past({ years: 10 }),
    updatedAt: faker.date.past({ years: 2 }),
    isNSFW: Math.random() > 0.5,
    isAiUsed: Math.random() > 0.5,
  };
}
