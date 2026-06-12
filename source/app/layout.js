import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://sharif-hossain.me";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Sharif Hossain | Cloud & DevSecOps Engineer",
    template: "%s | Sharif Hossain",
  },
  description:
    "Sharif Hossain is an Assistant Principal Software Engineer with 8+ years of experience in cloud infrastructure, DevSecOps, microservices, CI/CD, Kubernetes, AWS, and Linux systems engineering.",
  keywords: [
    "Sharif Hossain",
    "Cloud Engineer",
    "DevSecOps Engineer",
    "AWS",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Software Architecture",
    "Microservices",
    "Next.js",
    "React",
    "Linux",
    "FreeSWITCH",
    "Asterisk",
    "PSM I",
    "Scrum Master",
  ],
  authors: [{ name: "Sharif Hossain", url: SITE_URL }],
  creator: "Sharif Hossain",
  publisher: "Sharif Hossain",
  category: "Technology",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sharif Hossain",
    title: "Sharif Hossain | Cloud & DevSecOps Engineer",
    description:
      "Assistant Principal Software Engineer specialising in cloud infrastructure, DevSecOps, microservices, CI/CD, and secure platform engineering.",
    images: [
      {
        url: "/hero-cloudsec.png",
        width: 1200,
        height: 630,
        alt: "Sharif Hossain – Cloud & DevSecOps Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sharif Hossain | Cloud & DevSecOps Engineer",
    description:
      "Assistant Principal Software Engineer with 8+ years in cloud infrastructure, DevSecOps, microservices, and CI/CD systems.",
    images: ["/hero-cloudsec.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
