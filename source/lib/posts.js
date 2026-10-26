import slugify from "slugify";
import { db } from "./db.js";

const postColumns =
  "id, title, slug, excerpt, content, category, tags, featured, published, created_at, updated_at";

function normalizePost(row) {
  if (!row) return null;

  return {
    ...row,
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    tags: JSON.parse(row.tags || "[]"),
  };
}

export function getPosts({ query = "", tag = "" } = {}) {
  const filters = ["published = 1"];
  const params = {};

  if (query) {
    filters.push("(title LIKE @query OR excerpt LIKE @query OR content LIKE @query)");
    params.query = `%${query}%`;
  }

  if (tag) {
    filters.push("tags LIKE @tag");
    params.tag = `%"${tag}"%`;
  }

  return db
    .prepare(
      `SELECT ${postColumns}
       FROM posts
       WHERE ${filters.join(" AND ")}
       ORDER BY featured DESC, datetime(created_at) DESC`
    )
    .all(params)
    .map(normalizePost);
}

export function getFeaturedPosts() {
  return db
    .prepare(
      `SELECT ${postColumns}
       FROM posts
       WHERE published = 1
       ORDER BY featured DESC, datetime(created_at) DESC
       LIMIT 4`
    )
    .all()
    .map(normalizePost);
}

export function getPost(slug) {
  return normalizePost(
    db
      .prepare(`SELECT ${postColumns} FROM posts WHERE slug = ? AND published = 1`)
      .get(slug)
  );
}

export function getAllTags() {
  const tags = new Set();
  db.prepare("SELECT tags FROM posts WHERE published = 1")
    .all()
    .forEach((row) => {
      JSON.parse(row.tags || "[]").forEach((tag) => tags.add(tag));
    });

  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function createPost(input) {
  const now = new Date().toISOString();
  const title = input.title.trim();
  const baseSlug = slugify(input.slug || title, { lower: true, strict: true });
  const slug = uniqueSlug(baseSlug);
  const tags = input.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  db.prepare(
    `INSERT INTO posts
      (title, slug, excerpt, content, category, tags, featured, published, created_at, updated_at)
     VALUES
      (@title, @slug, @excerpt, @content, @category, @tags, @featured, @published, @created_at, @updated_at)`
  ).run({
    title,
    slug,
    excerpt: input.excerpt.trim(),
    content: input.content.replace(/\r\n/g, "\n").trim(),
    category: input.category.trim() || "Engineering",
    tags: JSON.stringify(tags),
    featured: input.featured ? 1 : 0,
    published: input.published ? 1 : 0,
    created_at: now,
    updated_at: now,
  });

  return slug;
}

function uniqueSlug(baseSlug) {
  let slug = baseSlug || "post";
  let suffix = 2;

  while (db.prepare("SELECT 1 FROM posts WHERE slug = ?").get(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export function getPostForAdmin(slug) {
  return normalizePost(
    db.prepare(`SELECT ${postColumns} FROM posts WHERE slug = ?`).get(slug)
  );
}

export function updatePost(slug, input) {
  const now = new Date().toISOString();
  const tags = input.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  db.prepare(
    `UPDATE posts
     SET title      = @title,
         excerpt    = @excerpt,
         content    = @content,
         category   = @category,
         tags       = @tags,
         featured   = @featured,
         published  = @published,
         updated_at = @updated_at
     WHERE slug = @slug`
  ).run({
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content.replace(/\r\n/g, "\n").trim(),
    category: (input.category || "Engineering").trim(),
    tags: JSON.stringify(tags),
    featured: input.featured ? 1 : 0,
    published: input.published ? 1 : 0,
    updated_at: now,
  });
}

export function deletePost(slug) {
  db.prepare("DELETE FROM posts WHERE slug = ?").run(slug);
}
