// Approved biographies, supplied by the founders. Photos: save public/images/team/habeeb-oseni.jpg, adekunle-divine.jpg, oluwatobi-ayodele.jpg (shown automatically) and verified links when available.
export type Member = {
  name: string;
  title: string;
  responsibilities: string[];
  bio?: string[]; // one entry per paragraph
  photo?: string;
  links?: { label: string; url: string }[]; // verified links only
};

export const team: Member[] = [
  {
    name: "Habeeb Oseni",
    title: "Creative Director, Founder & Brand Strategist",
    responsibilities: ["Creative vision", "Brand direction", "Creative strategy", "Motion design", "Video editing"],
    bio: [
      "Habeeb Oseni is a UK-based Creative Director, Founder, and Brand Strategist leading MKVine Design Agency. His creative career began hands-on in graphic design. He started out directly alongside his co-founder, Adekunle Divine, on foundational design projects, before he strategically expanded his capabilities into high-end motion graphics, video editing, and complete brand architecture.",
      "Driven by an ambitious entrepreneurial mindset, Habeeb bridged the gap between visual execution and business strategy.",
      "Today, under his creative direction and strategic leadership, MKVine shapes compelling visual identities and motion experiences for forward-thinking clients globally.",
      "He directly oversees and executes core studio projects, including Zerocard, Skn.type, Pluto, and Finex.",
    ],
  },

  {
    name: "Adekunle Divine",
    title: "Co-Founder & Lead Brand Designer",
    responsibilities: [
      "Graphic design",
      "Brand identity",
      "Visual systems",
      "Marketing materials",
      "Typography",
      "Colour systems",
      "Creative assets",
    ],
    bio: [
      "Adekunle Divine is a Nigerian creative entrepreneur, Co-Founder, and Lead Brand Designer driven by a passion for building meaningful visual systems and digital experiences.",
      "His creative journey began in September 2025 through self-directed study. He mastered his craft independently by studying professional workflows, experimenting with design challenges, and leveraging online resources to sharpen his skills.",
      "Alongside his personal creative concepts, including Morova, Sunvia, ASAF, LifeNet, Úrú Collective, and Wexyn, Adekunle leads brand and UI/UX design execution across MKVine Design Agency's core client projects.",
    ],
  },

  {
    name: "Oluwatobi Ayodele",
    title: "Co-Founder & Lead Software Developer",
    responsibilities: [
      "Website development",
      "Software engineering",
      "Custom web applications",
      "Mobile application development",
      "Technical architecture",
      "App deployment",
      "Software functionality",
    ],
    bio: [
      "Oluwatobi Ayodele is a Nigerian technology enthusiast, entrepreneur, and Lead Software Developer dedicated to building modern, responsive, and user-friendly digital solutions.",
      "Driven by a deep passion for innovation and digital architecture, he specializes in translating complex creative concepts into seamless, high-performing websites and applications that empower businesses to scale.",
      "As a Co-Founder at MKVine Design Agency, Oluwatobi bridges the gap between design and technology, overseeing full-stack development builds alongside his experience across platforms such as ASAF Hub, Gramex, Emyjay, HTTPRiri, and Synergy Logistics.",
    ],
  },
];
