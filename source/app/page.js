import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Blocks,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  Download,
  GitBranch,
  Globe,
  Lock,
  Mail,
  MapPin,
  Network,
  Phone,
  PhoneCall,
  Server,
  ShieldCheck,
  TerminalSquare,
  Users,
} from "lucide-react";
import { getFeaturedPosts } from "@/lib/posts";

const capabilities = [
  { icon: Users, label: "Project & Team Leadership", text: "Agile/Scrum facilitation, project management, cross-functional team leadership" },
  { icon: CloudCog, label: "Cloud & Infrastructure", text: "AWS, Google Cloud, Docker, Kubernetes, Ansible, Jenkins" },
  { icon: Database, label: "Big Data & Analytics", text: "Elasticsearch, Apache Spark, Google BigQuery, Hadoop" },
  { icon: PhoneCall, label: "Networking & VoIP", text: "Asterisk, FreeSWITCH, enterprise networking solutions" },
  { icon: Server, label: "Database Management", text: "PostgreSQL, MySQL, SQLite — design, optimization, replication" },
  { icon: BrainCircuit, label: "AI, LLM & Agentic AI", text: "LLMs, Generative AI, agentic AI, AI agents, local LLM deployment, LLM integration & orchestration" },
  { icon: Network, label: "Microservices & Distributed Systems", text: "RESTful APIs, service-oriented architecture, API gateways, service discovery" },
  { icon: ShieldCheck, label: "Cybersecurity & DevSecOps", text: "SIEM/XDR/SOAR, IDS/IPS, vulnerability management, threat detection, incident response, server hardening" },
];

const techStack = [
  { category: "Cloud & Infrastructure", items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Ansible", "Jenkins"] },
  { category: "Languages", items: ["PHP", "Python", "JavaScript", "TypeScript", "C/C++", "Perl", "Shell"] },
  { category: "Frameworks", items: ["Laravel", "CodeIgniter", "Django", "React.js", "Next.js", "Angular", "Node.js"] },
  { category: "AI & LLM", items: ["LLMs", "Generative AI", "Agentic AI", "AI Agents", "Local LLM Deployment", "LLM Orchestration"] },
  { category: "Big Data & Analytics", items: ["Elasticsearch", "Apache Spark", "BigQuery", "Hadoop", "PostgreSQL", "MySQL"] },
  { category: "VoIP & Telecom", items: ["Asterisk", "FreeSWITCH", "DIDWW", "DIDX"] },
  { category: "Security & Ops", items: ["SIEM/XDR/SOAR", "IDS/IPS", "Server Hardening", "Linux/Unix", "Agile/Scrum"] },
];

const projects = [
  {
    title: "Smart Cabin Router",
    tag: "Embedded + Cloud",
    text: "In-flight connectivity with aircraft-to-ground real-time communication protocol, Linux module customization, and Elasticsearch-powered operational analytics.",
  },
  {
    title: "Asterisk & FreeSWITCH Core Dev",
    tag: "VoIP",
    text: "Core contributions to Asterisk and FreeSWITCH, carrier integrations with DIDWW and DIDX, and telecom platforms serving diverse global needs.",
  },
  {
    title: "Virtual Phone Service",
    tag: "Telecom SaaS",
    text: "Worldwide virtual phone number service with server-side architecture designed and led end-to-end from launch onward.",
  },
  {
    title: "VoIP Billing System",
    tag: "Platform",
    text: "Comprehensive billing system for VoIP operations, streamlining rating, invoicing, and account management at carrier scale.",
  },
  {
    title: "SaaS for RMM",
    tag: "Cloud SaaS",
    text: "Cloud applications for Remote Monitoring and Management, blending product engineering with operational ownership and CI/CD pipelines.",
  },
  {
    title: "Embedded Data Links",
    tag: "Systems",
    text: "Efficient, secure protocols for reliable system-to-system data transfer in embedded environments.",
  },
];

const SITE_URL = "https://sharif-hossain.me";

export const metadata = {
  title: "Sharif Hossain | Cloud, DevSecOps & AI Engineer",
  description:
    "Sharif Hossain is an Assistant Principal Software Engineer II with 10+ years of experience in cloud infrastructure, DevSecOps, cybersecurity, microservices, agentic AI/LLM systems, CI/CD, Kubernetes, AWS, and Linux systems engineering.",
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
  jobTitle: "Assistant Principal Software Engineer II",
  worksFor: {
    "@type": "Organization",
    name: "Brotecs Technologies Limited",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [SITE_URL],
  knowsAbout: [
    "Cloud Engineering", "DevSecOps", "Cybersecurity", "Software Architecture",
    "Microservices", "CI/CD", "AWS", "Google Cloud", "Kubernetes",
    "Docker", "Ansible", "Jenkins", "Elasticsearch", "Apache Spark", "BigQuery",
    "FreeSWITCH", "Asterisk", "Linux", "PHP", "Python", "JavaScript", "TypeScript",
    "Large Language Models", "Generative AI", "Agentic AI",
    "Scrum", "Agile",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American International University-Bangladesh",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Professional Scrum Master™ I (PSM I)",
      recognizedBy: {
        "@type": "Organization",
        name: "Scrum.org",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Ethical Hacker",
      recognizedBy: {
        "@type": "Organization",
        name: "Cisco Networking Academy (NetAcad)",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Sharif Hossain",
  description:
    "Personal site and engineering blog of Sharif Hossain – Cloud, DevSecOps & AI Engineer.",
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

        <div className="heroAvatar" aria-hidden="true">
          <Image src="/hero-avatar.png" alt="" width={1024} height={765} />
        </div>

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
            Cloud Engineering · Tech Lead · DevSecOps · AI/LLM · PSM I Certified
          </div>
          <h1>
            Building secure,
            <br />
            <span className="gradientText">production-grade</span>
            <br />
            cloud systems.
          </h1>
          <p>
            Assistant Principal Software Engineer II with 10+ years designing cloud infrastructure,
            microservices, CI/CD pipelines, and agentic AI systems that scale under real-world pressure.
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
            {["AWS", "Kubernetes", "Docker", "CI/CD", "LLMs", "FreeSWITCH"].map((t) => (
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
          <strong>Dhaka</strong>
          <span>Brotecs Technologies Limited</span>
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
            VoIP platforms, embedded communications, and — increasingly — agentic AI and
            LLM-powered automation, always with an eye on operational excellence and team growth.
          </p>
          <p className="aboutMuted">
            Currently at <strong>Brotecs Technologies Limited</strong> as an Assistant
            Principal Software Engineer II, leading technical decisions and mentoring
            engineering teams since June 2017.
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
  ai:      [LLMs, Agentic AI, RAG]
  telecom: [Asterisk, FreeSWITCH]
process:
  deliver: CI/CD · release automation
  secure:  SIEM/SOAR · IDS/IPS · hardening
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
          <ShieldCheck size={36} className="credMainIcon" />
          <div className="credInfo">
            <span className="eyebrow">Certification</span>
            <h3>Ethical Hacker</h3>
            <p>Cisco Networking Academy (NetAcad) · Issued July 2026</p>
          </div>
          <Lock size={52} className="credBadgeIcon" />
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
            <p>Assistant Principal Software Engineer II </p>
            <p>Technical Lead - Cloud, Cyber Security & AIOps</p>
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
          <span>© {new Date().getFullYear()} Sharif Hossain. All rights reserved.</span>
          <span>sharif-hossain.me · Dhaka, Bangladesh</span>
        </div>
      </footer>
    </main>
    </>
  );
}
