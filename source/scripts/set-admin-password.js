import { db } from "../lib/db.js";
import { hashPassword } from "../lib/password.js";

const password = process.env.ADMIN_PASSWORD;

if (!password) {
  console.error("Set ADMIN_PASSWORD before running this script.");
  process.exit(1);
}

const now = new Date().toISOString();
const result = db
  .prepare(
    `UPDATE users
     SET password_hash = @password_hash, updated_at = @updated_at
     WHERE username = 'admin'`
  )
  .run({
    password_hash: hashPassword(password),
    updated_at: now,
  });

if (result.changes === 0) {
  db.prepare(
    `INSERT INTO users (username, password_hash, role, created_at, updated_at)
     VALUES ('admin', @password_hash, 'admin', @created_at, @updated_at)`
  ).run({
    password_hash: hashPassword(password),
    created_at: now,
    updated_at: now,
  });
}

console.log("Admin password updated.");
