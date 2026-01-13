"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = {
      title: "color: #10b981; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
      subtitle: "color: #6ee7b7; font-size: 14px; font-style: italic;",
      section: "color: #34d399; font-size: 12px; font-weight: bold; margin-top: 10px;",
      text: "color: #a7f3d0; font-size: 11px;",
      link: "color: #5eead4; font-size: 11px; text-decoration: underline;",
      ascii: "color: #10b981; font-size: 10px; font-family: monospace;",
    };

    console.clear();

    console.log(`%c
███████╗ █████╗ ██╗   ██╗██╗      ██████╗ ██████╗
██╔════╝██╔══██╗╚██╗ ██╔╝██║     ██╔═══██╗██╔══██╗
███████╗███████║ ╚████╔╝ ██║     ██║   ██║██████╔╝
╚════██║██╔══██║  ╚██╔╝  ██║     ██║   ██║██╔══██╗
███████║██║  ██║   ██║   ███████╗╚██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
`, styles.ascii);

    console.log("%c👋 Hey there, curious developer!", styles.title);
    console.log("%cYou found the Easter egg!", styles.subtitle);

    console.log("%c\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", styles.section);
    console.log("%c📋 ABOUT ME", styles.section);
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", styles.section);

    console.log("%cSaylor Damasceno", styles.title);
    console.log("%cTech Lead | 15+ Years in Software Engineering", styles.text);
    console.log("%c📍 Campinas, SP, Brazil", styles.text);
    console.log("%c🏢 Currently @ Atlas", styles.text);

    console.log("%c\n🛠️ EXPERTISE", styles.section);
    console.log("%c• Back-end Development (PHP Specialist)", styles.text);
    console.log("%c• AI & LLMs (LangChain, RAG, OpenAI, Azure)", styles.text);
    console.log("%c• Cloud Architecture (AWS, Azure)", styles.text);
    console.log("%c• Technical Leadership & Product Strategy", styles.text);

    console.log("%c\n🔗 CONNECT", styles.section);
    console.log("%cLinkedIn: https://linkedin.com/in/saylordamasceno", styles.link);
    console.log("%cGitHub: https://github.com/saylorgabriel", styles.link);

    console.log("%c\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", styles.section);
    console.log("%c🚀 Open to new opportunities!", styles.subtitle);
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", styles.section);

  }, []);

  return null;
}
