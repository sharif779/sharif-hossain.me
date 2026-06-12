"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth";
import { createPost } from "@/lib/posts";

export async function publishPost(formData) {
  const user = await requireAdmin();

  if (!user) {
    redirect("/admin?error=session");
  }

  const slug = createPost({
    title: formData.get("title") || "",
    slug: formData.get("slug") || "",
    excerpt: formData.get("excerpt") || "",
    content: formData.get("content") || "",
    category: formData.get("category") || "Engineering",
    tags: formData.get("tags") || "",
    featured: formData.get("featured") === "on",
    published: formData.get("published") !== "off",
  });

  revalidatePath("/");
  revalidatePath("/blog");
  redirect(`/blog/${slug}`);
}

export async function login(formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const ok = await loginAdmin(username, password);

  if (!ok) {
    redirect("/admin?error=login");
  }

  redirect("/admin");
}

export async function logout() {
  await logoutAdmin();
  redirect("/admin");
}
