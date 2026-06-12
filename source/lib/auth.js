import crypto from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db.js";
import { verifyPassword } from "./password.js";

const cookieName = "sh_admin_session";
const maxAge = 60 * 60 * 8;

function getSecret() {
  return process.env.AUTH_SECRET || "local-dev-secret-change-before-deploy";
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function createSessionValue(username) {
  const expiresAt = Date.now() + maxAge * 1000;
  const payload = `${username}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function parseSessionValue(value) {
  if (!value) return null;

  const parts = value.split(".");
  if (parts.length !== 3) return null;

  const [username, expiresAt, signature] = parts;
  const payload = `${username}.${expiresAt}`;
  const expected = sign(payload);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  if (Number(expiresAt) < Date.now()) {
    return null;
  }

  return username;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const username = parseSessionValue(cookieStore.get(cookieName)?.value);

  if (!username) return null;

  return db
    .prepare("SELECT id, username, role FROM users WHERE username = ?")
    .get(username);
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin" ? user : null;
}

export async function loginAdmin(username, password) {
  const user = db
    .prepare("SELECT username, password_hash, role FROM users WHERE username = ?")
    .get(username);

  if (!user || user.role !== "admin" || !verifyPassword(password, user.password_hash)) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionValue(user.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
