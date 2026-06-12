import Link from "next/link";
import { Pencil, Search, Trash2 } from "lucide-react";
import { getAllTags, getPosts } from "@/lib/posts";
import { getCurrentUser } from "@/lib/auth";
import { deletePostAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog – Cloud, DevSecOps & Linux Engineering Notes",
  description:
    "Engineering blog by Sharif Hossain covering cloud infrastructure, DevSecOps, Linux, microservices, CI/CD pipelines, VoIP, and platform engineering.",
  alternates: {
    canonical: "https://sharif-hossain.me/blog",
  },
  openGraph: {
    type: "website",
    url: "https://sharif-hossain.me/blog",
    title: "Blog – Cloud, DevSecOps & Linux Engineering Notes",
    description:
      "In-depth notes on cloud infrastructure, DevSecOps, Linux, microservices, CI/CD, and platform engineering by Sharif Hossain.",
  },
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const tag = params?.tag || "";
  const posts = getPosts({ query, tag });
  const tags = getAllTags();
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <main className="pageShell">
      <nav className="simpleNav">
        <Link href="/">Sharif Hossain</Link>
        <Link href="/admin">{isAdmin ? "New post" : "Write"}</Link>
      </nav>
      <header className="blogHeader">
        <span className="eyebrow">Engineering Blog</span>
        <h1>Cloud, DevSecOps, Linux, and product engineering notes.</h1>
      </header>
      <form className="searchBar">
        <Search size={18} />
        <input name="q" defaultValue={query} placeholder="Search posts, incidents, platforms..." />
        {tag ? <input type="hidden" name="tag" value={tag} /> : null}
        <button>Search</button>
      </form>
      <div className="tagRail">
        <Link className={!tag ? "active" : ""} href="/blog">All</Link>
        {tags.map((item) => (
          <Link className={tag === item ? "active" : ""} href={`/blog?tag=${encodeURIComponent(item)}`} key={item}>
            {item}
          </Link>
        ))}
      </div>
      <section className="postList">
        {posts.map((post) =>
          isAdmin ? (
            <div className="widePost" key={post.slug}>
              <div>
                <span>{post.category}</span>
                <Link href={`/blog/${post.slug}`} className="widePostTitleLink">
                  <h2>{post.title}</h2>
                </Link>
                <p>{post.excerpt}</p>
                <div className="postAdminBar">
                  <Link href={`/admin/edit/${post.slug}`} className="postEditBtn">
                    <Pencil size={13} /> Edit
                  </Link>
                  <form action={deletePostAction}>
                    <input type="hidden" name="slug" value={post.slug} />
                    <button type="submit" className="postDeleteBtn">
                      <Trash2 size={13} /> Delete
                    </button>
                  </form>
                </div>
              </div>
              <small>{post.tags.join(" / ")}</small>
            </div>
          ) : (
            <Link href={`/blog/${post.slug}`} className="widePost" key={post.slug}>
              <div>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
              <small>{post.tags.join(" / ")}</small>
            </Link>
          )
        )}
      </section>
    </main>
  );
}
