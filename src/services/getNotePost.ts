import "server-only";

import { NotePost, PostType } from "@/types/post";
import { faker } from "@faker-js/faker";
import { Identity } from "./getUser";

// Function overloads
export default async function getNotePost(audioId: string): Promise<NotePost>;
export default async function getNotePost(
  username: string,
  noteSlug: string,
): Promise<NotePost>;

// Implementation of the function
export default async function getNotePost(
  arg1: string,
  arg2?: string,
): Promise<NotePost> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const noteId = arg1;
  const username = arg1;
  const noteSlug = arg2;

  const isUsingNoteId = arg2 == undefined;

  return {
    postType: PostType.Note,
    noteId: noteSlug ? noteSlug : noteId,
    name: faker.music.songName(),
    description: faker.lorem.paragraphs(2),
    author: {
      displayName: faker.internet.displayName(),
      username: !isUsingNoteId ? username : faker.internet.userName(),
      identity: faker.helpers.arrayElement(Object.values(Identity)),
    },
    createdAt: faker.date.past({ years: 10 }),
    updatedAt: faker.date.past({ years: 2 }),
  };
}
