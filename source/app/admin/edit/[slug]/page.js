import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { Save } from "lucide-react";
import { editPost } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { getPostForAdmin } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }) {
  const { slug } = await params;
  const user = await requireAdmin();

  if (!user) redirect("/admin");

  const post = getPostForAdmin(slug);
  if (!post) notFound();

  return (
    <main className="pageShell">
      <nav className="simpleNav">
        <Link href="/">Sharif Hossain</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <section className="editorHeader">
        <span className="eyebrow">Edit post</span>
        <h1>Editing: {post.title}</h1>
      </section>
      <form action={editPost} className="editorForm">
        <input type="hidden" name="slug" value={post.slug} />
        <label>
          Title
          <input name="title" required defaultValue={post.title} />
        </label>
        <label>
          Excerpt
          <textarea name="excerpt" required rows={3} defaultValue={post.excerpt} />
        </label>
        <label>
          Content
          <textarea name="content" required rows={14} defaultValue={post.content} />
        </label>
        <div className="formGrid">
          <label>
            Category
            <input name="category" defaultValue={post.category} />
          </label>
          <label>
            Tags
            <input name="tags" defaultValue={post.tags.join(", ")} />
          </label>
        </div>
        <label className="checkLine">
          <input type="checkbox" name="featured" defaultChecked={post.featured} />
          Feature this post
        </label>
        <label className="checkLine">
          <input type="checkbox" name="published" defaultChecked={post.published} />
          Published
        </label>
        <button className="primaryAction" type="submit">
          <Save size={18} /> Save changes
        </button>
      </form>
    </main>
  );
}
