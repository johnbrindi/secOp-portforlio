export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  likes: number;
  comments: Array<{ name: string; email: string; comment: string; time?: string }>;
}

export const initialProjects: Project[] = [
  {
    id: 1,
    title: "SOC Dashboard",
    description: "SOC Incident Response Dashboard\nReal-time security operations center dashboard for incident tracking, threat analysis, and response coordination.",
    image: "pic.jpg",
    likes: 15,
    comments: [
      { name: "David Kim", email: "david@example.com", comment: "Real-time capabilities are outstanding!", time: "3 hours ago" },
      { name: "Lisa Zhang", email: "lisa@example.com", comment: "Perfect for our SOC operations.", time: "1 day ago" },
    ],
  },
  {
    id: 2,
    title: "Threat Intel",
    description: "Threat Intelligence Platform\nAdvanced threat intelligence gathering and analysis platform with machine learning capabilities for threat prediction.",
    image: "pic.jpg",
    likes: 67,
    comments: [
      { name: "John Doe", email: "john@example.com", comment: "A must-have tool for security experts.", time: "5 hours ago" },
      { name: "Sophia White", email: "sophia@example.com", comment: "Very insightful and easy to use!", time: "2 days ago" },
    ],
  },
  {
    id: 3,
    title: "Network Monitor",
    description: "Network Monitoring & Analysis Tool\nComprehensive network monitoring solution with real-time traffic analysis and anomaly detection capabilities.",
    image: "pic.jpg",
    likes: 31,
    comments: [
      { name: "James Smith", email: "james@example.com", comment: "The analytics are top-notch!", time: "1 day ago" },
      { name: "Sophie Turner", email: "sophie@example.com", comment: "I love the user interface!", time: "3 days ago" },
    ],
  },
  {
    id: 4,
    title: "Vuln Management",
    description: "Vulnerability Management System\nEnterprise-grade vulnerability management platform with automated scanning, prioritization, and remediation tracking.",
    image: "pic.jpg",
    likes: 18,
    comments: [
      { name: "Mark Johnson", email: "mark@example.com", comment: "Very effective for managing vulnerabilities.", time: "2 days ago" },
      { name: "Emily Davis", email: "emily@example.com", comment: "Helps keep our systems secure.", time: "1 week ago" },
    ],
  },
];