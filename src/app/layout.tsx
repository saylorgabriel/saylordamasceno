import type { Metadata } from "next";
import "./globals.css";
import { ConsoleEasterEgg } from "@/components/ConsoleEasterEgg";

export const metadata: Metadata = {
  title: "Saylor Damasceno | Tech Lead & AI Engineer",
  description: "Tech Lead with 15+ years in Software Engineering. Specialist in Back-end Development, AI/LLMs (LangChain, RAG), and Cloud Architecture (AWS, Azure). Based in Campinas, Brazil.",
  keywords: [
    "Saylor Damasceno",
    "Software Engineer",
    "Tech Lead",
    "AI Engineer",
    "LLM Specialist",
    "Back-end Developer",
    "PHP Developer",
    "LangChain",
    "RAG",
    "Retrieval-Augmented Generation",
    "OpenAI",
    "Azure AI",
    "AWS",
    "Cloud Architect",
    "Campinas",
    "Brazil",
    "Software Architecture",
    "Machine Learning",
    "Artificial Intelligence"
  ],
  authors: [{ name: "Saylor Damasceno", url: "https://linkedin.com/in/saylordamasceno" }],
  creator: "Saylor Damasceno",
  publisher: "Saylor Damasceno",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    title: "Saylor Damasceno | Tech Lead & AI Engineer",
    description: "Tech Lead with 15+ years in Software Engineering. Specialist in Back-end, AI/LLMs, and Cloud Architecture.",
    siteName: "Saylor Damasceno Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saylor Damasceno | Tech Lead & AI Engineer",
    description: "Tech Lead with 15+ years in Software Engineering. Specialist in Back-end, AI/LLMs, and Cloud Architecture.",
  },
  category: "technology",
  classification: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Orbitron:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="author" href="/llms.txt" />
        <meta name="subject" content="Software Engineer & AI Specialist Portfolio" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
      </head>
      <body className="antialiased overflow-hidden">
        <ConsoleEasterEgg />
        {children}
      </body>
    </html>
  );
}
