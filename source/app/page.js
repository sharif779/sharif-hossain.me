import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  CloudCog,
  Database,
  Download,
  GitBranch,
  Layers3,
  Network,
  Phone,
  RadioTower,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { getFeaturedPosts } from "@/lib/posts";

const capabilities = [
  { icon: Layers3, label: "Software Architecture", text: "System design, service boundaries, modular architecture, technical documentation" },
  { icon: Network, label: "Microservices", text: "Distributed services, API design, event-aware workflows, integration contracts" },
  { icon: CloudCog, label: "Cloud Platforms", text: "AWS, Google Cloud, Kubernetes, Docker, Linux hardening" },
  { icon: GitBranch, label: "Delivery Systems", text: "CI/CD, Jenkins, release automation, deployment reliability" },
  { icon: ShieldCheck, label: "DevSecOps", text: "Secure pipelines, access control, system hardening, payment safety" },
  { icon: Database, label: "Data Backplanes", text: "Elasticsearch, BigQuery, PostgreSQL, MySQL, SQLite" },
  { icon: Workflow, label: "Platform Tooling", text: "Automation, monitoring, build tools, internal systems, operational dashboards" },
];

const projects = [
  ["Smart Cabin Router", "In-flight connectivity with aircraft-to-ground communication, Linux module customization, and operational analytics."],
  ["Microservice Platforms", "Service-oriented architecture with clear API contracts, independent deployment paths, and maintainable domain boundaries."],
  ["VoIP Platforms", "Core Asterisk and FreeSWITCH work, global number services, billing systems, and telecom integrations."],
  ["SaaS for RMM", "Cloud applications for Remote Monitoring and Management, blending product engineering with operational ownership."],
  ["Embedded Data Links", "Efficient protocols for secure and reliable system-to-system data transfer."],
];

export default function HomePage() {
  const posts = getFeaturedPosts();

  return (
    <main>
      <section className="hero">
        <Image
          src="/hero-cloudsec.png"
          alt=""
          fill
          priority
          className="heroImage"
          sizes="100vw"
        />
        <div className="heroOverlay" />
        <nav className="topbar" aria-label="Primary navigation">
          <Link href="/" className="brand">Sharif Hossain</Link>
          <div className="navLinks">
            <Link href="#work">Work</Link>
            <Link href="#systems">Systems</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </nav>
        <div className="heroContent">
          <div className="availability">
            <BadgeCheck size={18} /> Cloud Engineering + DevSecOps
          </div>
          <h1>Secure cloud systems with a production engineer's heartbeat.</h1>
          <p>
            I am Sharif Hossain, an Assistant Principal Software Engineer working across software
            architecture, cloud infrastructure, microservices, CI/CD, platform security, Linux
            systems, and communication products that behave under real-world pressure.
          </p>
          <div className="heroActions">
            <Link href="/blog" className="primaryAction">
              Read the blog <ArrowRight size={18} />
            </Link>
            <a href="mailto:sharif.aiub.20@gmail.com" className="secondaryAction">
              Contact
            </a>
          </div>
        </div>
      </section>

      <section className="signalBand" aria-label="Professional highlights">
        <div>
          <strong>10+ years</strong>
          <span>cloud, platform, and product engineering</span>
        </div>
        <div>
          <strong>PSM I</strong>
          <span>Scrum.org certified, issued March 2025</span>
        </div>
        <div>
          <strong>Dhaka</strong>
          <span>building with global product teams</span>
        </div>
      </section>

      <section className="profileBand">
        <div className="profilePhoto">
          <Image
            src="/sharif-office.png"
            alt="Sharif Hossain in an engineering workspace"
            fill
            sizes="(max-width: 820px) 100vw, 44vw"
          />
        </div>
        <div className="profileCopy">
          <span className="eyebrow">Architecture in practice</span>
          <h2>Designing systems close to the people who operate them.</h2>
          <p>
            My work sits where software architecture meets production reality: microservices,
            cloud platforms, release pipelines, observability, data systems, and the team habits
            that keep complex products understandable.
          </p>
          <div className="profileChips">
            <span>Microservices</span>
            <span>System design</span>
            <span>Platform tools</span>
            <span>DevSecOps</span>
          </div>
        </div>
      </section>

      <section className="sectionGrid" id="systems">
        <div className="sectionIntro">
          <span className="eyebrow">Operating model</span>
          <h2>Infrastructure, security, and product delivery in one loop.</h2>
          <p>
            The strongest systems are built by people who can move between architecture, code,
            microservice boundaries, deployment, observability, security, and team rhythm without
            dropping context.
          </p>
        </div>
        <div className="capabilityGrid">
          {capabilities.map(({ icon: Icon, label, text }) => (
            <article className="capabilityCard" key={label}>
              <Icon size={24} />
              <h3>{label}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="consoleSection" id="work">
        <div className="consolePanel" aria-label="Engineering profile">
          <div className="consoleHeader">
            <span />
            <span />
            <span />
          </div>
          <pre>{`pipeline:
  design: scalable cloud + software architecture
  model: microservices, APIs, and domain boundaries
  secure: harden linux + delivery paths
  ship: reliable CI/CD releases
  observe: logs, metrics, customer impact
tooling:
  automate: deployment, monitoring, and repeatable operations
  integrate: cloud, data, telecom, and internal platforms
leadership:
  mentor: junior and mid-level engineers
  align: product, UX, quality, business
  improve: agile practice + documentation`}</pre>
        </div>
        <div className="projectList">
          <span className="eyebrow">Selected systems</span>
          <h2>Products with real operational gravity.</h2>
          {projects.map(([title, text]) => (
            <article className="projectItem" key={title}>
              <Blocks size={20} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blogPreview">
        <div className="sectionIntro">
          <span className="eyebrow">Field notes</span>
          <h2>Writing from the cloud engineering floor.</h2>
        </div>
        <div className="postGrid">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="postCard" key={post.slug}>
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <small>{post.tags.join(" / ")}</small>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <TerminalSquare size={20} />
          <span>sharif-hossain.me</span>
        </div>
        <div>
          <RadioTower size={20} />
          <a href="mailto:sharif.aiub.20@gmail.com">sharif.aiub.20@gmail.com</a>
        </div>
        <div>
          <Phone size={20} />
          <a href="tel:+8801621561651">+8801621561651</a>
        </div>
        <div>
          <Download size={20} />
          <a href="/Sharif_Hossain_Resume.pdf" download>
            Download resume
          </a>
        </div>
      </footer>
    </main>
  );
}
