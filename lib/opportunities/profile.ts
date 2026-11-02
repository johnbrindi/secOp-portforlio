// What "relevant" means for the digests. Derived from the portfolio profile:
// a 4th-year Computer Engineering student at NAHPI Bamenda working in SOC / SIEM,
// web pentesting, network security, IAM, cloud security and web development.
// Tech opportunities rank Cameroon first and favour internships / entry-level roles;
// the scholarship digest looks for funded Master's study abroad.

export const RECIPIENT = process.env.OPPORTUNITY_EMAIL_TO || "johnbrindi4@gmail.com";

// Core topics. An item must match at least one of these to be considered.
export const TOPICS: Record<string, string[]> = {
  "Cybersecurity": [
    "cybersecurity", "cyber security", "cyber-security", "cybersécurité", "cybersecurite",
    "sécurité informatique", "securite informatique", "sécurité des systèmes", "infosec",
    "information security", "soc analyst", "security operations", "siem", "pentest*",
    "penetration test*", "ethical hack*", "red team", "blue team", "threat", "incident response",
    "malware", "vulnerabilit*", "ctf", "capture the flag", "bug bounty", "owasp", "iam",
    "identity and access", "grc", "forensic*", "cybercrim*", "cybercriminalité", "devsecops",
    "cloud security", "security engineer", "security analyst",
  ],
  "Networking": [
    "network engineer", "network administrator", "networking", "réseau", "réseaux",
    "reseau", "telecom", "télécom", "telecommunication", "télécommunication",
    "5g", "4g/lte", "lte", "wireless", "rf engineer", "fibre optique", "fiber optic", "voip", "ccna", "ccnp", "cisco", "mikrotik", "fortinet",
    "firewall", "routing", "switching", "ip/mpls", "mpls", "noc", "sysadmin",
    "system administrator", "administrateur système", "infrastructure", "devops",
    "cloud engineer", "aws", "azure", "linux",
  ],
  "Web Development": [
    "web developer", "web development", "développeur web", "developpeur web", "frontend",
    "front-end", "backend", "back-end", "full stack", "fullstack", "full-stack", "next.js",
    "nextjs", "react", "typescript", "javascript", "node.js", "php developer", "développeur php", "laravel", "django",
    "software developer", "software engineer", "développeur", "developer",
  ],
  // Broad tech words: only count for local (Cameroon) items, where any tech
  // event or programme is worth seeing.
  "Tech (general)": [
    "ict", "tic", "numérique", "digital skills", "tech hub", "coding", "programming",
    "informatique", "it intern", "computer science", "computer engineering",
    "génie informatique", "génie logiciel", "tech summit",
    "developers", "gdg", "devfest", "google developer", "hackathon",
  ],
};

// Specific skills from the profile that push an item up the list.
export const PROFILE_BOOSTERS = [
  "soc", "siem", "splunk", "wazuh", "elastic", "suricata", "snort", "ids", "ips",
  "pentest*", "penetration", "oscp", "ceh", "security+", "comptia", "okta", "scim",
  "iam", "aws", "threat hunting", "incident response", "yara", "pnetlab", "cisco",
  "vlan", "next.js", "typescript", "postgresql", "python", "rust", "devfest", "gdg",
  "junior", "entry level", "entry-level", "graduate", "intern", "stagiaire", "student",
  "étudiant", "final year", "fresh graduate", "young graduate", "jeunes diplômés",
  "jeune diplômé", "stage de fin d'études", "graduate trainee", "trainee", "telecom*",
  "télécom*", "computer engineering", "génie informatique",
];

// Matching is whole-word (a trailing s/x is allowed); a term ending in "*" is a
// prefix, e.g. "recruit*" matches recruiting / recruitment.

// Words that make something an *opportunity* rather than plain news.
export const OPPORTUNITY_TYPES: Record<string, string[]> = {
  "Internship": ["internship", "intern", "stage", "stagiaire", "stage académique", "stage professionnel", "trainee", "apprenticeship", "alternance"],
  "Job": ["job", "hiring", "recruit*", "recrut*", "offre d'emploi", "emploi", "vacancy", "vacancies", "position", "poste", "career", "we are looking for"],
  "Event": ["conference", "conférence", "summit", "sommet", "meetup", "webinar", "workshop", "atelier", "devfest", "forum", "salon", "seminar", "séminaire", "event", "évènement", "événement", "festival", "expo"],
  "Training": ["bootcamp", "training", "formation", "course", "cours", "certification", "academy", "programme", "program", "mentorship", "mentorat", "free course"],
  // Degree scholarships go to the separate scholarship digest; this covers
  // fellowships, grants and funded short programmes.
  "Fellowship / Funded Training": ["scholarship", "bourse", "fellowship", "grant", "funding", "fully funded", "fully-funded", "funded"],
  "Competition": ["hackathon", "competition", "concours", "challenge", "ctf", "capture the flag", "award", "prix", "call for applications", "appel à candidatures", "appel a candidatures", "call for proposals", "apply now", "applications open", "candidatures"],
};

// Local signals. Anything matching these goes to the top "Cameroon" section.
export const LOCAL_TERMS = [
  "cameroon", "cameroun", "camerounais", "cameroonian", "bamenda", "douala", "yaoundé",
  "yaounde", "buea", "limbe", "bafoussam", "garoua", "maroua", "ngaoundéré", "ngaoundere",
  "bertoua", "ebolowa", "kribi", "kumba", "dschang", "nahpi", "silicon mountain",
  "minpostel", "antic", "activspaces",
];

// Remote roles are only useful if someone in Cameroon can actually take them.
export const REMOTE_ELIGIBLE = /worldwide|anywhere|global|africa|emea|cameroon|cameroun|remote$|^$/i;

// Things that share keywords with security/networking but are not relevant.
export const EXCLUDE = [
  "security guard", "security officer", "agent de sécurité", "agent de securite",
  "gardiennage", "vigile", "food security", "sécurité alimentaire", "securite alimentaire",
  "social security", "sécurité sociale", "security forces", "forces de sécurité",
  "network marketing", "social network", "réseau social", "réseaux sociaux",
  "réseau routier", "réseau électrique", "water network", "nurse", "infirmier",
  "driver", "chauffeur", "sales representative", "commercial terrain", "account manager",
  "account executive", "sales", "business development",
];

// Senior roles are pushed down (early-career profile); not removed, just ranked lower.
export const SENIOR = /\b(senior|sr\.|lead|principal|staff|director|head of|chief|manager|vp|architect)\b/i;

// ── Master's scholarship digest ─────────────────────────────────────────────

export const SCHOLARSHIP_TERMS = [
  "scholarship", "bourse", "fellowship", "fully funded", "fully-funded", "funded",
  "stipend", "tuition waiver", "tuition-free", "financement", "entièrement financé*",
];

export const MASTERS_TERMS = [
  "master", "master's", "masters", "msc", "m.sc", "meng", "m.eng", "mastère",
  "postgraduate", "post-graduate", "graduate studies", "graduate program*",
  "graduate degree", "joint master", "second cycle",
];

// Big international programmes that fund Master's degrees in any field.
export const MAJOR_PROGRAMMES = [
  "erasmus mundus", "daad", "chevening", "mastercard foundation", "mext", "gks",
  "global korea scholarship", "stipendium hungaricum", "türkiye burslari",
  "turkiye burslari", "chinese government scholarship", "csc scholarship", "fulbright",
  "eiffel", "commonwealth", "swedish institute", "orange knowledge", "vlir-uos",
  "nuffic", "kaist", "holland scholarship", "australia awards", "aga khan",
  "joint japan/world bank", "jds", "islamic development bank", "isdb",
];

// Fit with the fields you want to study, best first. Order defines the email sections.
export const FIELD_FIT: Record<string, string[]> = {
  "Your fields": [
    "cybersecurity", "cyber security", "cybersécurité", "information security", "networking",
    "network*", "réseau*", "telecommunication*", "télécommunication*", "telecom*",
    "computer engineering", "génie informatique", "computer science", "informatique",
    "information technology", "ict", "electrical engineering", "electronic*",
    "communication engineering", "wireless", "5g", "embedded systems", "cloud computing",
    "software engineering", "data science", "artificial intelligence",
  ],
  "STEM & Engineering": ["stem", "engineering", "ingénierie", "technology", "technical", "natural sciences", "applied sciences"],
  "Open to all fields": [
    "all fields", "any field", "all disciplines", "various fields", "all subjects",
    "all courses", "tous domaines", ...MAJOR_PROGRAMMES,
  ],
};

// Signals that someone from Cameroon is eligible.
export const ELIGIBILITY_TERMS = [
  "africa", "african", "africans", "afrique", "africains", "cameroon", "cameroun",
  "developing countries", "international students", "international student",
  "étudiants internationaux", "all nationalities", "low and middle income", "lmic",
  "sub-saharan", "commonwealth",
];

// Titles that make it a short programme (tech digest), not a degree scholarship.
export const NOT_DEGREE = /\b(internship|intern|summer school|winter school|summit|conference|workshop|bootcamp|hackathon|competition|exchange programme)\b/i;

// Awards reserved for one other nationality. Cameroon / "Africans" in the text overrides this.
export const OTHER_NATIONALITY = /\b(pakistani|indian|afghan|south african|nigerian|kenyan|ghanaian|malawian|bangladeshi|egyptian|filipino|indonesian|vietnamese|nepali|sri lankan|ugandan|zambian|zimbabwean|ethiopian|tanzanian)s?\s+(students?|nationals?|citizens?|applicants?|youth)\b|\bfor\s+(young\s+)?(pakistani|indian|afghan|south african|nigerian|kenyan|ghanaian|malawian|bangladeshi)s?\b/i;

export const PHD_TERMS = ["phd", "ph.d", "doctoral", "doctorate", "doctorat", "postdoc*"];
export const UNDERGRAD_TERMS = ["undergraduate", "bachelor", "bachelor's", "licence", "high school", "secondary school"];

export const DESTINATIONS = [
  "Germany", "France", "United Kingdom", "UK", "Ireland", "Netherlands", "Belgium",
  "Sweden", "Finland", "Norway", "Denmark", "Switzerland", "Austria", "Italy", "Spain",
  "Portugal", "Hungary", "Poland", "Czech", "Estonia", "Turkey", "Türkiye", "Canada",
  "USA", "United States", "Australia", "New Zealand", "Japan", "Korea", "China",
  "Taiwan", "Thailand", "Singapore", "Malaysia", "India", "Saudi Arabia", "UAE", "Qatar", "Israel",
  "Rwanda", "South Africa", "Morocco", "Egypt", "Ghana", "Kenya", "Europe",
];

// ── Fully funded travel: international summits, conferences, youth programmes ──
// Not tied to your tech fields: leadership summits, exchanges and fellowships abroad
// are worth seeing when the organiser pays. Shown in the Opportunity Digest's own section.

export const FUNDED_TRAVEL_TERMS = [
  "fully funded", "fully-funded", "travel grant", "travel support", "travel scholarship",
  "airfare", "flights covered", "flight tickets", "return flight", "round trip", "round-trip",
  "all expenses paid", "all-expenses-paid", "expenses covered", "accommodation covered",
  "entièrement financé*", "billet d'avion", "prise en charge",
];

export const TRAVEL_PROGRAMME_TERMS = [
  "summit", "conference", "forum", "congress", "assembly", "youth leader*", "young leader*",
  "leadership programme", "leadership program", "exchange programme", "exchange program",
  "summer school", "winter school", "fellowship", "delegate*", "bootcamp", "training programme",
  "training program", "academy", "workshop", "festival", "model united nations", "mun",
  "sommet", "conférence", "programme d'échange", "jeunes leaders",
];

// Signals that the programme is open internationally (and so to Cameroonians).
export const OPEN_INTERNATIONALLY = /\b(all countries|any country|worldwide|international (applicants|participants|youth|students)|global|all nationalities|africa|african|developing countries|youth from around the world|cameroon|cameroun)\b/i;

// Shown on funded-travel items. Update when your passport situation changes.
export const PASSPORT_NOTE = "Passport needed for travel (you plan to apply in January 2027). Many programmes let you apply now and show the passport later — check the requirements.";
