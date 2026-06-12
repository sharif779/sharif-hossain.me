import { db } from "../lib/db.js";
import { hashPassword } from "../lib/password.js";

const posts = [
  {
    title: "Architecture Notes for Microservices That Stay Useful",
    slug: "architecture-notes-microservices-stay-useful",
    excerpt:
      "Microservices work best when service boundaries, deployment flow, data ownership, and observability are designed together.",
    content:
      "Microservices are not only a deployment pattern. They are an architecture decision that changes how teams think about ownership, data, failure, and change. A useful service boundary should make the product easier to evolve, not just split the repository into smaller pieces.\n\nWhen I design distributed systems, I look for clear API contracts, predictable data ownership, independent release paths, and operational signals that explain what each service is doing. Without those pieces, microservices can become a network of hidden coupling.\n\nThe same thinking applies to platform tools. CI/CD, monitoring, access control, internal dashboards, and automation scripts should reduce coordination cost for engineers. Good architecture is not only the diagram. It is the daily workflow that lets teams ship safely.",
    category: "Software Architecture",
    tags: ["Architecture", "Microservices", "Platform Tooling"],
    featured: 1,
  },
  {
    title: "A Practical DevSecOps Loop for Small Platform Teams",
    slug: "practical-devsecops-loop-small-platform-teams",
    excerpt:
      "Security work becomes useful when it is embedded into the same feedback loop that ships software.",
    content:
      "A good DevSecOps practice is less about adding a security stage and more about improving the shape of the delivery loop. The team should know what changed, what risk it introduces, how it will be deployed, and how it will be observed after release.\n\nI like pipelines that make the safe path the shortest path. That means dependency checks, image scanning, secret detection, infrastructure review, and deployment evidence are visible without forcing engineers into separate rituals.\n\nThe goal is not to block every release. The goal is to help the team understand risk early enough that fixes are ordinary engineering work.",
    category: "DevSecOps",
    tags: ["DevSecOps", "CI/CD", "Security"],
    featured: 1,
  },
  {
    title: "What In-Flight Connectivity Taught Me About Reliability",
    slug: "in-flight-connectivity-reliability-lessons",
    excerpt:
      "Aircraft communication systems make reliability feel concrete because every weak assumption becomes visible.",
    content:
      "Working on smart cabin router systems sharpened how I think about production. The environment is constrained, communication paths are unusual, and every optimization needs to respect the hardware and network reality.\n\nThe most useful habit is to design with failure as a normal state. Real-time communication, customized Linux modules, and telemetry pipelines all need to keep producing useful signals when the world is imperfect.\n\nThat lesson transfers cleanly to cloud platforms: resilient systems are designed by engineers who stay close to runtime behavior.",
    category: "Cloud Engineering",
    tags: ["Cloud", "Linux", "Reliability"],
    featured: 1,
  },
  {
    title: "SQLite Is a Serious Blogging Backend",
    slug: "sqlite-serious-blogging-backend",
    excerpt:
      "For a personal site, SQLite gives you a durable, fast, low-friction place to write and ship.",
    content:
      "A blog does not always need a distributed database. SQLite is compact, reliable, and easy to back up. For a personal engineering site, that simplicity is a feature.\n\nThe important part is to treat it like a real datastore: use migrations or predictable schema setup, keep slugs unique, store tags in a format you can query, and avoid turning the database into a hidden dependency that nobody can reproduce.\n\nSmall tools can still be built with production taste.",
    category: "Engineering",
    tags: ["SQLite", "Next.js", "Blogging"],
    featured: 1,
  },
];

const insert = db.prepare(`
  INSERT INTO posts
    (title, slug, excerpt, content, category, tags, featured, published, created_at, updated_at)
  VALUES
    (@title, @slug, @excerpt, @content, @category, @tags, @featured, 1, @created_at, @updated_at)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    excerpt = excluded.excerpt,
    content = excluded.content,
    category = excluded.category,
    tags = excluded.tags,
    featured = excluded.featured,
    updated_at = excluded.updated_at
`);

const insertAdmin = db.prepare(`
  INSERT INTO users
    (username, password_hash, role, created_at, updated_at)
  VALUES
    (@username, @password_hash, 'admin', @created_at, @updated_at)
  ON CONFLICT(username) DO NOTHING
`);

const now = new Date().toISOString();
const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

db.exec("BEGIN");

try {
  for (const post of posts) {
    insert.run({
      ...post,
      tags: JSON.stringify(post.tags),
      created_at: now,
      updated_at: now,
    });
  }

  insertAdmin.run({
    username: "admin",
    password_hash: hashPassword(adminPassword),
    created_at: now,
    updated_at: now,
  });

  db.exec("COMMIT");
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
}

console.log(`Seeded ${posts.length} blog posts into data/blog.sqlite`);
console.log("Ensured admin user exists: admin");
