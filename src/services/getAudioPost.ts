import "server-only";

import { AudioPost, PostType } from "@/types/post";
import { allFakers, faker } from "@faker-js/faker";
import { Identity } from "./getUser";

// // Function overloads
// export default async function getAudioPost(audioId: string): Promise<AudioPost>;
// export default async function getAudioPost(
//   username: string,
//   audioSlug: string,
// ): Promise<AudioPost>;

interface GetAudioPostByAudioIdProps {
  audioId: string;
}
export interface GetAudioPostBySlugProps {
  username: string;
  audioSlug: string;
}
// type checking functions
function isGetAudioPostByAudioIdProps(
  props: GetAudioPostByAudioIdProps | GetAudioPostBySlugProps,
): props is GetAudioPostByAudioIdProps {
  return "audioId" in props;
}

// Implementation of the function
export default async function getAudioPost(
  props: GetAudioPostByAudioIdProps | GetAudioPostBySlugProps,
): Promise<AudioPost> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    postType: PostType.Audio,
    audioId: isGetAudioPostByAudioIdProps(props)
      ? props.audioId
      : faker.string.uuid(),
    duration: Math.ceil(Math.random() * 3 * 59 * 60 + 60),
    audience: `${"F".repeat(Math.ceil(Math.random() * 3))}4M`,
    hasTeaser: Math.random() > 0.5,
    isScriptFill: Math.random() > 0.5,
    language: faker.location.countryCode("alpha-2"),
    secondaryLanguage:
      Math.random() > 0.5 ? faker.location.countryCode("alpha-2") : undefined,
    tags: new Array(Math.ceil(Math.random() * 20))
      .fill(0)
      .map(() => faker.music.genre()),
    name: faker.music.songName(),
    description: faker.lorem.paragraphs({ min: 3, max: 10 }),
    author: {
      displayName: faker.internet.displayName(),
      username: isGetAudioPostByAudioIdProps(props)
        ? faker.internet.userName()
        : props.username,
      identity: faker.helpers.arrayElement(Object.values(Identity)),
    },
    coAuthors: new Array(Math.ceil(Math.random() * 10)).fill(0).map(() => ({
      displayName: faker.internet.displayName(),
      username: faker.internet.userName(),
      identity: faker.helpers.arrayElement(Object.values(Identity)),
    })),
    createdAt: faker.date.past({ years: 10 }),
    updatedAt: faker.date.past({ years: 2 }),
    isNSFW: Math.random() > 0.5,
    isAiUsed: Math.random() > 0.5,
  };
}
