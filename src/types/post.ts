import { Identity } from "@/services/getUser";

// Define the enum for post types
export enum PostType {
  Note = "note",
  Audio = "audio",
  Script = "script",
}

export type User = {
  displayName: string;
  username: string;
  identity: Identity;
};

// Define the base interface for common properties
export interface BasePost {
  postType: PostType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  description: string;
}

interface PostWithTags extends BasePost {
  tags: string[];
  audience: string;
  language: string;
  secondaryLanguage?: string;
  coAuthors: User[];
  isNSFW: boolean;
  isAiUsed: boolean;
}

// Define the specific interfaces for each post type
export interface AudioPost extends PostWithTags {
  postType: PostType.Audio;
  audioId: string;
  duration: number; // Example of additional property for audio
  hasTeaser: boolean;
  isScriptFill: boolean;
}

export interface ScriptPost extends PostWithTags {
  postType: PostType.Script;
  scriptId: string;
  wordCount: number;
  language: string; // Example of additional property for script
  isUnfilled: boolean;
}

export interface NotePost extends BasePost {
  postType: PostType.Note;
  noteId: string;
}

// Create a union type for all post types
export type Post = AudioPost | ScriptPost | NotePost;

// Type guard function for AudioPost
export function isAudioPost(post: Post): post is AudioPost {
  return post.postType === PostType.Audio;
}

// Type guard function for ScriptPost
export function isScriptPost(post: Post): post is ScriptPost {
  return post.postType === PostType.Script;
}

// Type guard function for NotePost
export function isNotePost(post: Post): post is NotePost {
  return post.postType === PostType.Note;
}

export function isValidPostType(value: any): value is PostType {
  return Object.values(PostType).includes(value);
}
