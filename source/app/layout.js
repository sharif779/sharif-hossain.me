import "./globals.css";

export const metadata = {
  title: "Sharif Hossain | Cloud Engineering & DevSecOps",
  description:
    "Personal site and blog of Sharif Hossain, a Cloud and DevSecOps engineer building secure infrastructure, CI/CD systems, and resilient platforms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
