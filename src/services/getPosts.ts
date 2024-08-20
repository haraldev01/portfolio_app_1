import "server-only";
// should not be called from client components, they should call /api/[username]/posts instead.

import {
  PostType,
  Post,
  User,
  BasePost,
  AudioPost,
  NotePost,
  ScriptPost,
} from "@/types/post";
import { setTimeout } from "timers/promises";
import { faker } from "@faker-js/faker";
import { Identity } from "./getUser";

export type GetPostsInterface = { maxPage: number; posts: Post[] };

/**
 *
 * @param username the username of the user to fetch public posts for.
 * @param page the page of the posts to fetch (offset=page*limit).
 * @param limit number of posts to fetch.
 * @param postType the type of post to fetch. Defaults to all types.
 */
export async function getPosts({
  username,
  page,
  limit,
  postType,
}: {
  username: string;
  page: number;
  limit: number;
  postType?: PostType;
}): Promise<GetPostsInterface> {
  if (page < 1) throw new Error("page must be 1 or higher");

  await setTimeout(500);

  const getRest: (
    postType?: PostType,
  ) =>
    | Omit<AudioPost, keyof BasePost>
    | Omit<ScriptPost, keyof BasePost>
    | Omit<NotePost, keyof BasePost> = (postType?: PostType) => {
    switch (postType) {
      case PostType.Audio:
        return {
          postType: PostType.Audio,
          audioId: faker.lorem.slug({ min: 1, max: 3 }).replaceAll("-", "_"),
          audience: `${"F".repeat(Math.ceil(Math.random() * 3))}4M`,
          duration: Math.ceil(Math.random() * 3 * 59 * 60 + 60),
          tags: new Array(Math.ceil(Math.random() * 20))
            .fill(0)
            .map(() => faker.music.genre()),
          language: faker.location.countryCode("alpha-2"),
          secondaryLanguage:
            Math.random() > 0.5
              ? faker.location.countryCode("alpha-2")
              : undefined,
          hasTeaser: Math.random() > 0.5,
          isScriptFill: Math.random() > 0.5,
          coAuthors: Array.from({ length: Math.ceil(Math.random() * 10) }, () =>
            generateUser(),
          ),
          isNSFW: Math.random() > 0.5,
          isAiUsed: Math.random() > 0.5,
        } as Omit<AudioPost, keyof BasePost>;
      case PostType.Script:
        return {
          postType: PostType.Script,
          scriptId: faker.lorem.slug({ min: 1, max: 3 }).replaceAll("-", "_"),
          audience: `${"F".repeat(Math.ceil(Math.random() * 3))}4M`,
          tags: new Array(Math.ceil(Math.random() * 20))
            .fill(0)
            .map(() => faker.music.genre()),
          wordCount: Math.ceil(Math.random() * 5000 + 100),
          language: faker.location.countryCode("alpha-2"),
          secondaryLanguage:
            Math.random() > 0.5
              ? faker.location.countryCode("alpha-2")
              : undefined,
          isUnfilled: Math.random() > 0.5,
          coAuthors: Array.from({ length: Math.ceil(Math.random() * 10) }, () =>
            generateUser(),
          ),
          isNSFW: Math.random() > 0.5,
          isAiUsed: Math.random() > 0.5,
        } as Omit<ScriptPost, keyof BasePost>;
      case PostType.Note:
        return {
          postType: PostType.Note,
          noteId: faker.lorem.slug({ min: 1, max: 3 }).replaceAll("-", "_"),
        } as Omit<NotePost, keyof BasePost>;
      default:
        return getRest(
          [PostType.Audio, PostType.Script, PostType.Note].at(
            Math.floor(Math.random() * 3),
          ),
        );
    }
  };

  const posts = new Array(
    Math.random() > 0.7
      ? limit
      : Math.random() > 0.5
        ? Math.floor(limit / 2)
        : 0,
  )
    .fill(0)
    .map(
      (_, i) =>
        ({
          name: `${faker.music.songName()} ${page * limit + i}`,
          createdAt: faker.date.past({ years: 10 }),
          updatedAt: faker.date.past({ years: 2 }),
          author: {
            username: username,
            displayName: faker.internet.displayName(),
          },
          description: faker.lorem.paragraphs(2),
          ...getRest(postType),
        }) as Post,
    );

  return { maxPage: 10, posts };
}

const generateUser: () => User = () => {
  return {
    displayName: faker.internet.displayName(),
    username: faker.internet.userName(),
    identity: faker.helpers.arrayElement(Object.values(Identity)),
  };
};
