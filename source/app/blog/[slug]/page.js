import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main className="articleShell">
      <nav className="simpleNav">
        <Link href="/">Sharif Hossain</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <article className="article">
        <span className="eyebrow">{post.category}</span>
        <h1>{post.title}</h1>
        <p className="articleExcerpt">{post.excerpt}</p>
        <div className="articleTags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="articleBody">
          {post.content.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
