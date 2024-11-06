import type { Page, Post } from "@ts-ghost/content-api";
import { TSGhostContentAPI } from "@ts-ghost/content-api";

const ghostUrl = import.meta.env.GHOST_URL;
const ghostApiKey = import.meta.env.GHOST_KEY;

export const getAllAuthors = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const results = await api.authors
    .browse()
    .include({
      "count.posts": true,
    })
    .fetch();
  if (!results.success) {
    throw new Error(results.errors.map((e) => e.message).join(", "));
  }
  return {
    authors: results.data,
    meta: results.meta,
  };
};

export const getPosts = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const results = await api.posts
    .browse()
    .include({
      authors: true,
      tags: true,
    })
    .fetch();
  if (!results.success) {
    throw new Error(results.errors.map((e) => e.message).join(", "));
  }
  return {
    posts: results.data,
    meta: results.meta,
  };
};

export const getAllPosts = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const posts: Post[] = [];
  let cursor = await api.posts
    .browse()
    .include({
      authors: true,
      tags: true,
    })
    .paginate();
  if (cursor.current.success) posts.push(...cursor.current.data);
  while (cursor.next) {
    cursor = await cursor.next.paginate();
    if (cursor.current.success) posts.push(...cursor.current.data);
  }
  return posts;
};

export const getPostBySlug = async (slug: string) => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const result = await api.posts
    .read({ slug })
    .include({
      authors: true,
      tags: true,
    })
    .fetch();

  if (!result.success) {
    throw new Error(result.errors.map((e) => e.message).join(", "));
  }

  return result.data;
};

export const getAllPages = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const pages: Page[] = [];
  let cursor = await api.pages
    .browse()
    .include({
      authors: true,
      tags: true,
    })
    .paginate();
  if (cursor.current.success) pages.push(...cursor.current.data);
  while (cursor.next) {
    cursor = await cursor.next.paginate();
    if (cursor.current.success) pages.push(...cursor.current.data);
  }
  return pages;
};

export const getSettings = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const res = await api.settings.fetch();
  if (res.success) {
    return res.data;
  }
  throw new Error("Failed to fetch settings data");
};
export type NonNullable<T> = T extends null | undefined ? never : T;

export type Settings = NonNullable<Awaited<ReturnType<typeof getSettings>>>;

export const getAllTags = async () => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");
  const results = await api.tags
    .browse()
    .include({
      "count.posts": true,
    })
    .fetch();
  if (!results.success) {
    throw new Error(results.errors.map((e) => e.message).join(", "));
  }
  return {
    tags: results.data,
    meta: results.meta,
  };
};

// utils/api.ts

export const getTagWithPosts = async (slug: string) => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");

  // Get tag and its posts in parallel
  const [tagResult, postsResult] = await Promise.all([
    api.tags
      .read({ slug })
      .include({
        "count.posts": true,
      })
      .fetch(),

    api.posts
      .browse({
        filter: `tag:${slug}`, // Filter posts by tag slug
      } as any)
      .include({
        authors: true,
        tags: true,
      })
      .fetch(),
  ]);

  if (!tagResult.success) {
    throw new Error(tagResult.errors.map((e) => e.message).join(", "));
  }

  if (!postsResult.success) {
    throw new Error(postsResult.errors.map((e) => e.message).join(", "));
  }

  return {
    tag: tagResult.data,
    posts: postsResult.data,
  };
};

export const getAuthorWithPosts = async (slug: string) => {
  const api = new TSGhostContentAPI(ghostUrl, ghostApiKey, "v5.0");

  // Get author and their posts in parallel
  const [authorResult, postsResult] = await Promise.all([
    api.authors
      .read({ slug })
      .include({
        "count.posts": true,
      })
      .fetch(),

    api.posts
      .browse({
        filter: `author:${slug}`, // Filter posts by author slug
      } as any)
      .include({
        authors: true,
        tags: true,
      })
      .fetch(),
  ]);

  if (!authorResult.success) {
    throw new Error(authorResult.errors.map((e) => e.message).join(", "));
  }

  if (!postsResult.success) {
    throw new Error(postsResult.errors.map((e) => e.message).join(", "));
  }

  return {
    author: authorResult.data,
    posts: postsResult.data,
  };
};
