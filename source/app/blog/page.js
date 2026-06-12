import Link from "next/link";
import { Search } from "lucide-react";
import { getAllTags, getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const tag = params?.tag || "";
  const posts = getPosts({ query, tag });
  const tags = getAllTags();

  return (
    <main className="pageShell">
      <nav className="simpleNav">
        <Link href="/">Sharif Hossain</Link>
        <Link href="/admin">Write</Link>
      </nav>
      <header className="blogHeader">
        <span className="eyebrow">SQLite journal</span>
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
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} className="widePost" key={post.slug}>
            <div>
              <span>{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <small>{post.tags.join(" / ")}</small>
          </Link>
        ))}
      </section>
    </main>
  );
}
