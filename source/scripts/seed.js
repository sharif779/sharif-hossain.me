import { db } from "../lib/db.js";
import { hashPassword } from "../lib/password.js";

const posts = [
  {
    title: "Ten Years In: What Changes When You Move From Engineer to Architect",
    slug: "ten-years-engineer-to-architect",
    excerpt:
      "A decade at the same company teaches you more about mentorship, ownership, and technical judgment than any single project ever could.",
    content:
      "I joined Brotecs Technologies as a software engineer in 2017. Ten years later, the work looks different, even though a lot of the same systems are still running in production. The code changed, the team changed, but the biggest shift was in what I actually spend my time doing.\n\nEarly on, being a good engineer meant writing correct code, understanding the systems I touched, and shipping features without breaking things. That is still true, but it stopped being the whole job somewhere around the time I started reviewing architecture decisions for modules I would never personally write a line of. Technical leadership is less about having the right answer and more about asking the question that saves a team three weeks of rework: what happens to this service when the upstream contract changes, who owns this data, how do we roll this back at 2 a.m. if it goes wrong.\n\nGetting PSM I certified in 2025 was less about learning Scrum from scratch and more about putting language around habits I had already built through years of running feature discussions, algorithmic analysis, and documentation for complex modules. Agile ceremonies only matter if they protect engineering time and surface real blockers early. When they turn into status theater, something in the process needs to change, not the team.\n\nMentoring junior and mid-level engineers is the part of the job nobody prepares you for. The instinct is to hand someone the answer. The better move, almost always, is to ask them what they already tried and let them find the gap themselves. It takes longer in the moment and saves months over a career.",
    category: "Leadership",
    tags: ["Leadership", "Agile", "Career"],
    featured: 1,
  },
  {
    title: "Building the Smart Cabin Router: Real-Time Comms at 35,000 Feet",
    slug: "smart-cabin-router-in-flight-connectivity",
    excerpt:
      "In-flight connectivity has no tolerance for lazy assumptions — every network hiccup happens above the clouds, out of reach of a quick SSH session.",
    content:
      "The Smart Cabin Router project started from a simple requirement: give passengers and crew reliable connectivity during flight, using a network path that has none of the guarantees you get on the ground. No easy failover to a second ISP, no walking over to swap a cable, and a strict power and thermal budget that rules out throwing more hardware at the problem.\n\nWe built a real-time communication protocol for aircraft-to-ground links that had to tolerate intermittent handoffs between ground stations and satellite links without dropping active sessions. That meant designing around loss and jitter as the normal case, not the exception. Buffering strategy, retransmission timing, and session state all had to assume the link would degrade mid-flight, because it always did.\n\nA large part of the work happened below the application layer. We customized Linux kernel modules to squeeze more consistent throughput out of the router hardware, tuning network stacks and driver behavior for a very specific set of radios instead of relying on generic defaults. It is unglamorous work, but it is where a lot of the actual performance gains came from.\n\nOnce the router was live, Elasticsearch became the backbone for understanding what was actually happening across the fleet. We indexed connection quality, handoff events, and error conditions from every aircraft so we could see patterns that never would have shown up from a single flight's logs — recurring handoff failures over specific regions, hardware batches with elevated error rates, that sort of thing. Shipping the router was one milestone. Being able to see it operating at scale was the one that actually let us keep improving it.",
    category: "Cloud Engineering",
    tags: ["Embedded", "Linux", "Elasticsearch"],
    featured: 1,
  },
  {
    title: "Ten Years Inside Asterisk and FreeSWITCH",
    slug: "asterisk-freeswitch-core-development-notes",
    excerpt:
      "Core VoIP development teaches you that the SIP spec is a starting point, not a promise, and that billing accuracy is a harder problem than call routing.",
    content:
      "Contributing to the core of Asterisk and FreeSWITCH means spending a lot of time in the gap between what the SIP and RTP specs say should happen and what carriers, phones, and gateways actually do. Interop bugs rarely look like protocol violations. They look like a specific vendor's SBC sending a re-INVITE at the wrong point in a call, or a codec negotiation that technically follows the spec but breaks a particular hardware phone's assumptions. You fix enough of those and you stop trusting documentation until you have watched the packet capture yourself.\n\nWorking with platforms like DIDWW and DIDX added another layer: routing has to account for number portability, regional termination rules, and carrier-specific quirks that change without much notice. A route that worked perfectly last month can start failing silently because an upstream carrier changed how it handles a particular prefix, and the only way to catch it quickly is good call-quality monitoring, not just uptime checks.\n\nThe VoIP billing system was, in a lot of ways, the harder problem. Call routing failures are usually loud — calls do not connect, someone complains immediately. Billing errors are quiet. A rounding mistake in per-minute rating or a race condition in concurrent call session tracking can run for weeks before anyone notices the numbers do not add up, and by then you are reconciling real money against logs. I came out of that work with a healthy respect for idempotent event processing and for treating every billable event as something that has to be auditable after the fact, not just processed once and forgotten.",
    category: "VoIP & Telecom",
    tags: ["VoIP", "Asterisk", "FreeSWITCH"],
    featured: 1,
  },
  {
    title: "Agentic AI in Production: Wiring LLMs into Real Engineering Workflows",
    slug: "agentic-ai-production-llm-workflows",
    excerpt:
      "The interesting part of agentic AI is not the model. It's deciding which decisions you're actually willing to hand it.",
    content:
      "Most of the recent work I have done with LLMs and agentic AI has nothing to do with chatbots. It is about deciding which parts of an internal workflow — log triage, ticket classification, first-pass code review notes, report generation — can safely be handed to an agent that can call tools and take multi-step action, versus which parts still need a human holding the pen.\n\nThe honest answer is that most tasks people want to make 'agentic' do not need an agent. A well-scoped script with an LLM call for the one genuinely fuzzy step is more reliable, cheaper, and easier to debug than a fully autonomous loop. I reserve agent-style orchestration — where the model plans its own next steps and calls tools in a loop — for problems where the path to the answer is not known ahead of time, like investigating an incident across logs, metrics, and code before proposing a root cause.\n\nLocal LLM deployment matters more than people expect once you are working with anything sensitive. Running open-source models on infrastructure you control avoids sending internal logs, customer data, or proprietary code to a third-party API, and it gives you predictable latency and cost instead of being at the mercy of a shared endpoint. The tradeoff is real: you take on model hosting, GPU capacity planning, and version management yourself. For some workloads that tradeoff is obviously worth it. For others, orchestrating a hosted API with strict data handling is the more sensible call.\n\nThe part that actually took the most engineering effort was not the model integration — it was building the guardrails. Rate limits, cost ceilings, human-approval steps before anything irreversible happens, and structured logging of every tool call an agent makes. An agent that can take action without a clear audit trail is not a productivity tool, it is a liability waiting to surface.",
    category: "AI & LLM",
    tags: ["AI", "LLM", "Agentic AI", "Automation"],
    featured: 1,
  },
  {
    title: "What a Worldwide Virtual Phone Number Service Taught Me About Server-Side Architecture",
    slug: "virtual-phone-service-server-architecture",
    excerpt:
      "Provisioning phone numbers in dozens of countries sounds like a CRUD problem until you meet the regulatory and carrier reality behind each one.",
    content:
      "Building a virtual phone service that provisions numbers worldwide starts to look deceptively simple from the outside: pick a country, get a number, route calls to it. The server-side architecture underneath has to account for the fact that every country has different provisioning rules, different carrier partners, different documentation requirements, and different failure modes when a number can't be provisioned automatically.\n\nI designed the backend around a clear separation between number inventory, provisioning workflows, and call routing, so that a slow or failed provisioning step in one region never blocked number availability in another. Each provider integration lived behind the same internal interface, which meant we could add or swap a carrier partner without touching the parts of the system that customers actually interacted with.\n\nReliability here means something specific: a number that looks available in the dashboard but silently fails to route calls is worse than a number that is correctly marked unavailable. That pushed us toward validating the full path — provisioning, SIP trunk registration, and inbound call routing — before a number was ever exposed to a customer, rather than trusting a successful API response from a carrier as proof that everything downstream would actually work.\n\nLaunching that product reinforced something I keep relearning: the hard part of a \"simple\" product is almost never the feature customers see. It's the operational machinery that keeps the simple thing reliable across dozens of edge cases nobody will ever ask you about directly.",
    category: "VoIP & Telecom",
    tags: ["VoIP", "Architecture", "SaaS"],
    featured: 0,
  },
  {
    title: "SIEM, SOAR, and Getting Serious About Threat Detection on a Small Team",
    slug: "siem-soar-threat-detection-small-team",
    excerpt:
      "You don't need a dedicated SOC to run real threat detection — you need alerts that people actually trust enough to act on.",
    content:
      "Studying for the Ethical Hacker certification pushed me to formalize a lot of security instincts I had built up piecemeal over the years running production systems. It's one thing to know that unusual outbound traffic or a spike in failed logins is worth investigating. It's another to build detection rules, response playbooks, and escalation paths that hold up when the team on call is small and everyone already has a day job.\n\nThe biggest early mistake in SIEM work is chasing volume instead of signal. A rule set that fires hundreds of low-confidence alerts a day trains people to ignore the tool, and the one alert that mattered gets lost in the noise. I would rather ship fewer, higher-confidence detections tied to specific attack patterns — credential stuffing signatures, lateral movement indicators, anomalous privilege escalation — and expand coverage deliberately than turn on every out-of-the-box rule and hope someone has time to triage it all.\n\nSOAR playbooks earn their keep on the boring, repeatable first steps: isolating a host, disabling a compromised credential, pulling the relevant logs into one place before a human even looks at the alert. Automating that part doesn't replace incident response judgment, it just means the person making the real decisions isn't burning the first ten minutes on data collection.\n\nServer hardening and vulnerability management are the less exciting siblings of all this, and they are where most of the actual risk reduction happens. Patch cadence, least-privilege access, and configuration baselines prevent far more incidents than any detection rule ever will. Detection is what catches what hardening missed, not a substitute for it.",
    category: "DevSecOps",
    tags: ["DevSecOps", "Security", "SIEM", "Incident Response"],
    featured: 0,
  },
  {
    title: "Running Local LLMs: Notes on Open-Source Models in Production Tooling",
    slug: "local-llm-deployment-notes",
    excerpt:
      "Self-hosting a model is a different job than calling an API, and the differences show up in places you don't expect.",
    content:
      "Once you move from calling a hosted LLM API to deploying an open-source model on infrastructure you control, a lot of the problem shifts from prompt engineering to systems engineering. GPU memory budgets, batching strategy, and quantization tradeoffs start to matter as much as the prompt itself, because a model that produces a great answer in eight seconds under load is not actually usable in a workflow that needs a response in one.\n\nQuantized models are usually the right starting point for internal tooling. The quality drop from a well-chosen quantization is small for most structured tasks — classification, extraction, summarizing logs — and the difference in memory footprint determines whether you're running on hardware you already own or provisioning something new. I'd rather ship a slightly smaller model that runs reliably on existing infrastructure than chase the largest open-source checkpoint and fight capacity problems for months.\n\nVersion management turned out to be a bigger operational concern than I expected. Open-source models get updated, fine-tuned variants proliferate, and a workflow tuned against one checkpoint's quirks can quietly degrade when you swap in a newer one without re-validating. I treat model versions the same way I treat any other dependency: pinned explicitly, upgraded deliberately, and tested against a fixed set of real examples before the swap goes anywhere near production traffic.\n\nThe payoff for the added operational weight is real for the right workloads: predictable cost at scale, no data leaving infrastructure you control, and no dependency on a third party's rate limits or uptime. For anything touching sensitive logs or proprietary code, that tradeoff has been worth the extra plumbing every time.",
    category: "AI & LLM",
    tags: ["AI", "LLM", "Open Source", "Infrastructure"],
    featured: 0,
  },
  {
    title: "What Building RMM SaaS Software Taught Me About Operational Ownership",
    slug: "saas-rmm-operational-ownership",
    excerpt:
      "Remote monitoring software has an unusual property: when it fails quietly, the customers who need it most find out last.",
    content:
      "Building SaaS applications for Remote Monitoring and Management software comes with a specific kind of pressure: the product exists to tell customers when something is wrong with their infrastructure, which means the cost of the monitoring tool itself failing silently is much higher than in most software. A dashboard that stops updating and just looks calm is worse than one that clearly shows an error.\n\nThat shaped a lot of the architecture. Agents reporting from customer infrastructure needed to make their own health visible independently of the metrics they were collecting — a missing heartbeat had to be as loud a signal as a CPU spike. We built explicit staleness detection into the platform itself rather than trusting that an absence of alerts meant an absence of problems.\n\nOwning both development and operations on the same product changed how I wrote code. Knowing that I would be the one paged when a monitoring pipeline backed up made me far more careful about backpressure, queue depth limits, and graceful degradation than I might have been if operations were someone else's problem. Features got scoped differently once \"can I safely operate this at 3 a.m.\" became part of the definition of done.\n\nThe lesson that stuck with me most: for infrastructure tooling, the operational reliability of the tool is itself the product. Customers do not evaluate an RMM platform on its dashboard design. They evaluate it on whether it told them about the outage before their own customers did.",
    category: "Cloud Engineering",
    tags: ["SaaS", "RMM", "Operations"],
    featured: 0,
  },
  {
    title: "Architecture Notes for Microservices That Stay Useful",
    slug: "architecture-notes-microservices-stay-useful",
    excerpt:
      "Microservices work best when service boundaries, deployment flow, data ownership, and observability are designed together.",
    content:
      "Microservices are not only a deployment pattern. They are an architecture decision that changes how teams think about ownership, data, failure, and change. A useful service boundary should make the product easier to evolve, not just split the repository into smaller pieces.\n\nWhen I design distributed systems, I look for clear API contracts, predictable data ownership, independent release paths, and operational signals that explain what each service is doing. Without those pieces, microservices can become a network of hidden coupling.\n\nThe same thinking applies to platform tools. CI/CD, monitoring, access control, internal dashboards, and automation scripts should reduce coordination cost for engineers. Good architecture is not only the diagram. It is the daily workflow that lets teams ship safely.",
    category: "Software Architecture",
    tags: ["Architecture", "Microservices", "Platform Tooling"],
    featured: 0,
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
    featured: 0,
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
