import crypto from "node:crypto";

const keyLength = 64;

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, keyLength).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, originalHash] = storedHash.split(":");

  if (!salt || !originalHash) {
    return false;
  }

  const candidate = crypto.scryptSync(password, salt, keyLength);
  const original = Buffer.from(originalHash, "hex");

  return original.length === candidate.length && crypto.timingSafeEqual(original, candidate);
}
