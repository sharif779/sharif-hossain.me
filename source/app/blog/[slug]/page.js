import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { getPost } from "@/lib/posts";
import { getCurrentUser } from "@/lib/auth";
import { deletePostAction } from "@/app/actions";

export const dynamic = "force-dynamic";

const SITE_URL = "https://sharif-hossain.me";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      tags: post.tags,
      authors: ["Sharif Hossain"],
      images: [
        {
          url: "/hero-cloudsec.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Person",
      name: "Sharif Hossain",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Sharif Hossain",
      url: SITE_URL,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="articleShell">
        <nav className="simpleNav">
          <Link href="/">Sharif Hossain</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        {isAdmin && (
          <div className="articleAdminBar">
            <Link href={`/admin/edit/${post.slug}`} className="postEditBtn">
              <Pencil size={13} /> Edit post
            </Link>
            <form action={deletePostAction}>
              <input type="hidden" name="slug" value={post.slug} />
              <button type="submit" className="postDeleteBtn">
                <Trash2 size={13} /> Delete post
              </button>
            </form>
          </div>
        )}
        <article className="article">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="articleExcerpt">{post.excerpt}</p>
          <div className="articleTags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="articleBody">
            {post.content.split(/\r?\n\s*\r?\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
