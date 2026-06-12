import Link from "next/link";
import { LogOut, Save } from "lucide-react";
import { login, logout, publishPost } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage({ searchParams }) {
  const user = await requireAdmin();
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="pageShell">
      <nav className="simpleNav">
        <Link href="/">Sharif Hossain</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      {!user ? (
        <>
          <section className="editorHeader">
            <span className="eyebrow">Admin login</span>
            <h1>Sign in to write and publish.</h1>
          </section>
          <form action={login} className="editorForm loginForm">
            {error === "login" ? <p className="formError">Invalid username or password.</p> : null}
            {error === "session" ? <p className="formError">Please sign in before publishing.</p> : null}
            <label>
              Username
              <input name="username" required autoComplete="username" placeholder="admin" />
            </label>
            <label>
              Password
              <input
                name="password"
                required
                type="password"
                autoComplete="current-password"
                placeholder="Enter admin password"
              />
            </label>
            <button className="primaryAction" type="submit">
              Sign in
            </button>
          </form>
        </>
      ) : (
        <>
      <section className="editorHeader">
        <span className="eyebrow">Blog console</span>
        <h1>Publish a field note into SQLite.</h1>
        <form action={logout} className="logoutForm">
          <span>Signed in as {user.username}</span>
          <button type="submit">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </section>
      <form action={publishPost} className="editorForm">
        <label>
          Title
          <input name="title" required placeholder="Designing secure CI/CD for small platform teams" />
        </label>
        <label>
          Custom slug
          <input name="slug" placeholder="optional" />
        </label>
        <label>
          Excerpt
          <textarea name="excerpt" required rows={3} placeholder="A short summary for the blog index." />
        </label>
        <label>
          Content
          <textarea name="content" required rows={12} placeholder="Write paragraphs separated by blank lines." />
        </label>
        <div className="formGrid">
          <label>
            Category
            <input name="category" defaultValue="Engineering" />
          </label>
          <label>
            Tags
            <input name="tags" placeholder="Cloud, DevSecOps, Linux" />
          </label>
        </div>
        <label className="checkLine">
          <input type="checkbox" name="featured" />
          Feature this post
        </label>
        <button className="primaryAction" type="submit">
          <Save size={18} /> Publish
        </button>
      </form>
        </>
      )}
    </main>
  );
}
