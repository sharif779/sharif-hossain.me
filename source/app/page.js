import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Blocks,
  CloudCog,
  Code2,
  Database,
  Download,
  GitBranch,
  Globe,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  Server,
  ShieldCheck,
  TerminalSquare,
  Users,
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
  { icon: Users, label: "Team Leadership", text: "Technical mentorship, cross-functional alignment, Agile/Scrum facilitation" },
];

const techStack = [
  { category: "Cloud & Infrastructure", items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Ansible", "Jenkins"] },
  { category: "Languages", items: ["PHP", "Python", "JavaScript", "TypeScript", "C/C++", "Perl", "Shell"] },
  { category: "Frameworks", items: ["Laravel", "Django", "React.js", "Next.js", "Angular", "Node.js"] },
  { category: "Data & Analytics", items: ["Elasticsearch", "Apache Spark", "BigQuery", "PostgreSQL", "MySQL"] },
  { category: "VoIP & Telecom", items: ["Asterisk", "FreeSWITCH", "DIDWW", "DIDX"] },
  { category: "OS & Security", items: ["Linux/Unix", "Shell Scripting", "Server Hardening", "Agile/Scrum"] },
];

const projects = [
  {
    title: "Smart Cabin Router",
    tag: "Embedded + Cloud",
    text: "In-flight connectivity with aircraft-to-ground real-time communication protocol, Linux module customization, and Elasticsearch-powered operational analytics.",
  },
  {
    title: "Microservice Platforms",
    tag: "Architecture",
    text: "Service-oriented architecture with clear API contracts, independent deployment paths, and maintainable domain boundaries at scale.",
  },
  {
    title: "VoIP Platforms",
    tag: "Telecom",
    text: "Core Asterisk and FreeSWITCH development, global virtual number services, comprehensive billing systems, and telecom integrations.",
  },
  {
    title: "SaaS for RMM",
    tag: "Cloud SaaS",
    text: "Cloud applications for Remote Monitoring and Management, blending product engineering with operational ownership and CI/CD pipelines.",
  },
  {
    title: "Embedded Data Links",
    tag: "Systems",
    text: "Efficient protocols for secure and reliable system-to-system data transfer in embedded environments.",
  },
  {
    title: "Licensing Module",
    tag: "Platform",
    text: "Robust licensing system with secure payment integrations supporting various billing and subscription models.",
  },
];

const SITE_URL = "https://sharif-hossain.me";

export const metadata = {
  title: "Sharif Hossain | Cloud & DevSecOps Engineer",
  description:
    "Sharif Hossain is an Assistant Principal Software Engineer with 8+ years of experience in cloud infrastructure, DevSecOps, microservices, CI/CD, Kubernetes, AWS, and Linux systems engineering.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sharif Hossain",
  url: SITE_URL,
  email: "sharif.aiub.20@gmail.com",
  telephone: "+8801621561651",
  jobTitle: "Assistant Principal Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Stitel Networks, LLC",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phoenix",
      addressCountry: "US",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [SITE_URL],
  knowsAbout: [
    "Cloud Engineering", "DevSecOps", "Software Architecture",
    "Microservices", "CI/CD", "AWS", "Google Cloud", "Kubernetes",
    "Docker", "Ansible", "Jenkins", "Elasticsearch", "FreeSWITCH",
    "Asterisk", "Linux", "PHP", "Python", "JavaScript", "TypeScript",
    "Scrum", "Agile",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American International University-Bangladesh",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "Professional Scrum Master™ I (PSM I)",
    recognizedBy: {
      "@type": "Organization",
      name: "Scrum.org",
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Sharif Hossain",
  description:
    "Personal site and engineering blog of Sharif Hossain – Cloud & DevSecOps Engineer.",
  author: { "@type": "Person", name: "Sharif Hossain" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  const posts = getFeaturedPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main>
      {/* ── HERO ── */}
      <section className="hero">
        <Image src="/hero-cloudsec.png" alt="" fill priority className="heroImage" sizes="100vw" />
        <div className="heroOverlay" />
        <div className="heroOrb heroOrb1" aria-hidden="true" />
        <div className="heroOrb heroOrb2" aria-hidden="true" />

        <nav className="topbar" aria-label="Primary navigation">
          <Link href="/" className="brand">
            <TerminalSquare size={20} />
            Sharif Hossain
          </Link>
          <div className="navLinks">
            <Link href="#about">About</Link>
            <Link href="#stack">Stack</Link>
            <Link href="#work">Work</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <a href="mailto:sharif.aiub.20@gmail.com" className="navCta">Contact</a>
        </nav>

        <div className="heroContent">
          <div className="heroBadge">
            <span className="statusDot" aria-hidden="true" />
            <BadgeCheck size={15} />
            Cloud Engineering · DevSecOps · PSM I Certified
          </div>
          <h1>
            Building secure,
            <br />
            <span className="gradientText">production-grade</span>
            <br />
            cloud systems.
          </h1>
          <p>
            Assistant Principal Software Engineer with 8+ years designing cloud infrastructure,
            microservices, CI/CD pipelines, and platforms that scale under real-world pressure.
          </p>
          <div className="heroActions">
            <Link href="/blog" className="primaryAction">
              Read the blog <ArrowRight size={16} />
            </Link>
            <a href="mailto:sharif.aiub.20@gmail.com" className="secondaryAction">
              <Mail size={16} /> Get in touch
            </a>
          </div>
          <div className="heroPills">
            {["AWS", "Kubernetes", "Docker", "CI/CD", "Linux", "FreeSWITCH"].map((t) => (
              <span key={t} className="heroPill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="statsBand">
        <div className="statItem">
          <strong>10+</strong>
          <span>Years engineering</span>
        </div>
        <div className="statDivider" aria-hidden="true" />
        <div className="statDivider" aria-hidden="true" />
        <div className="statItem">
          <strong>PSM I</strong>
          <span>Scrum.org certified</span>
        </div>
        <div className="statDivider" aria-hidden="true" />
        <div className="statItem">
          <strong>Phoenix</strong>
          <span>Stitel Networks, LLC</span>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="aboutSection" id="about">
        <div className="aboutPhoto">
          <Image
            src="/sharif-office.png"
            alt="Sharif Hossain"
            fill
            sizes="(max-width: 820px) 100vw, 44vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="aboutPhotoOverlay" />
          <div className="aboutLocation">
            <MapPin size={13} />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
        <div className="aboutCopy">
          <span className="eyebrow">Who I am</span>
          <h2>
            Architect. Engineer.{" "}
            <span className="gradientText">Builder.</span>
          </h2>
          <p>
            I operate at the intersection of software architecture, cloud infrastructure,
            and platform security. My work spans microservices, CI/CD, Linux systems,
            VoIP platforms, and embedded communications — always with an eye on operational
            excellence and team growth.
          </p>
          <p className="aboutMuted">
            Currently at <strong>Stitel Networks, LLC</strong> as an Assistant Principal
            Software Engineer, leading technical decisions and mentoring engineering teams
            since June 2017.
          </p>
          <div className="aboutChips">
            <span><Code2 size={12} /> Microservices</span>
            <span><CloudCog size={12} /> Cloud Architecture</span>
            <span><ShieldCheck size={12} /> DevSecOps</span>
            <span><GitBranch size={12} /> CI/CD</span>
            <span><Users size={12} /> Team Leadership</span>
          </div>
          <a href="/Sharif_Hossain_Resume.pdf" download className="primaryAction resumeBtn">
            <Download size={15} /> Download Resume
          </a>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="stackSection" id="stack">
        <div className="stackInner">
          <div className="stackIntro">
            <span className="eyebrow">Technology</span>
            <h2>The stack behind the systems.</h2>
            <p>A decade of hands-on expertise across infrastructure, development, data, and operations.</p>
          </div>
          <div className="stackGrid">
            {techStack.map(({ category, items }) => (
              <div className="stackGroup" key={category}>
                <h4>{category}</h4>
                <div className="stackItems">
                  {items.map((item) => (
                    <span key={item} className="stackPill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="capSection">
        <div className="capLeft">
          <span className="eyebrow">Operating model</span>
          <h2>Full-loop engineering — architecture to operation.</h2>
          <p>
            The strongest systems are built by people who can move between architecture,
            code, deployment, observability, security, and team rhythm without dropping context.
          </p>
          <div className="consolePanel">
            <div className="consoleHeader">
              <span /><span /><span />
              <code className="consoleTitle">engineer.yml</code>
            </div>
            <pre>{`stack:
  cloud:   [AWS, GCP, K8s, Docker]
  code:    [PHP, Python, JS/TS, C++]
  data:    [ES, Spark, BigQuery, PG]
  telecom: [Asterisk, FreeSWITCH]
process:
  deliver: CI/CD · release automation
  secure:  hardening · access control
  observe: logs · metrics · impact
lead:
  mentor: junior & mid engineers
  align:  product · UX · QA
  method: Agile · Scrum · PSM I`}</pre>
          </div>
        </div>
        <div className="capGrid">
          {capabilities.map(({ icon: Icon, label, text }) => (
            <article className="capCard" key={label}>
              <div className="capCardIcon"><Icon size={20} /></div>
              <h3>{label}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projectsSection" id="work">
        <div className="projectsInner">
          <div className="projectsIntro">
            <span className="eyebrow">Selected systems</span>
            <h2>Products with real operational gravity.</h2>
            <p>High-impact engineering across aviation, telecom, cloud, and embedded systems.</p>
          </div>
          <div className="projectsGrid">
            {projects.map(({ title, tag, text }) => (
              <article className="projectCard" key={title}>
                <div className="projectCardTop">
                  <span className="projectTag">{tag}</span>
                  <Blocks size={16} className="projectIcon" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="credSection">
        <div className="credCard">
          <Award size={36} className="credMainIcon" />
          <div className="credInfo">
            <span className="eyebrow">Certification</span>
            <h3>Professional Scrum Master™ I (PSM I)</h3>
            <p>Scrum.org · Issued March 2025</p>
          </div>
          <BadgeCheck size={52} className="credBadgeIcon" />
        </div>
        <div className="credCard">
          <Globe size={36} className="credMainIcon" />
          <div className="credInfo">
            <span className="eyebrow">Education</span>
            <h3>B.Sc. Computer Science & Engineering</h3>
            <p>American International University-Bangladesh · December 2017</p>
          </div>
          <Server size={52} className="credBadgeIcon" />
        </div>
      </section>

      {/* ── BLOG ── */}
      {posts.length > 0 && (
        <section className="blogSection">
          <div className="blogSectionHeader">
            <div>
              <span className="eyebrow">Field notes</span>
              <h2>Writing from the cloud engineering floor.</h2>
            </div>
            <Link href="/blog" className="secondaryAction blogAllLink">
              All articles <ArrowRight size={15} />
            </Link>
          </div>
          <div className="postGrid">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="postCard" key={post.slug}>
                <span className="postCat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="postFooter">
                  <small>{post.tags.join(" · ")}</small>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footerInner">
          <div className="footerBrand">
            <div className="footerLogo">
              <TerminalSquare size={22} />
              <span>Sharif Hossain</span>
            </div>
            <p>Cloud & DevSecOps Engineer · Assistant Principal Software Engineer</p>
            <p className="footerSub">Building secure, scalable platforms since 2017.</p>
          </div>
          <div className="footerContact">
            <h4>Contact</h4>
            <a href="mailto:sharif.aiub.20@gmail.com"><Mail size={14} /> sharif.aiub.20@gmail.com</a>
            <a href="tel:+8801621561651"><Phone size={14} /> +880 162 156 1651</a>
            <a href="/Sharif_Hossain_Resume.pdf" download><Download size={14} /> Resume PDF</a>
          </div>
          <div className="footerNav">
            <h4>Navigation</h4>
            <Link href="#about">About</Link>
            <Link href="#stack">Tech Stack</Link>
            <Link href="#work">Work</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div className="footerBottom">
          <span>© 2025 Sharif Hossain. All rights reserved.</span>
          <span>sharif-hossain.me · Dhaka, Bangladesh</span>
        </div>
      </footer>
    </main>
    </>
  );
}
