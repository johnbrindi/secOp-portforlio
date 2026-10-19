export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
  publishedAt: string;
  likes: number;
}

const dummyBlogs: Blog[] = [
  {
    id: "1",
    title: "SIEM Tuning for SOC Teams: Reducing False Positives Without Missing Real Threats",
    excerpt:
      "Most SIEM deployments generate more noise than signal. Here is how to tune your rules intelligently without creating blind spots.",
    content: `Security Information and Event Management platforms are only as good as the rules driving them. Out-of-the-box SIEM configurations produce an overwhelming volume of alerts — most of which are noise. This writeup covers approaches that have worked in real monitoring environments.

## The Problem with Default Rules

Default detection rules are broad by design. They have to work across diverse environments, so they cast a wide net. In a mature SOC, you need precision, not volume.

## Baseline First

Before tuning anything, establish a behavioral baseline:
- What does normal authentication traffic look like for your org?
- Which accounts regularly log in after hours?
- What are the typical process tree patterns on your endpoints?

Without a baseline, you are tuning blind.

## Suppression vs. Whitelisting

There is an important distinction: suppression hides an alert while still logging the event. Whitelisting drops it entirely. In a regulated environment, suppression is almost always the right call — you want the logs, you just do not want your analysts drowning in them.

## Correlation Rules That Actually Work

The most effective detections are multi-source:
- Failed authentication + successful login from new geolocation (within 10 minutes)
- Port scan from internal host + outbound connection to new external IP (same session)
- Privileged account creation + immediate login from that account

Single-event rules create noise. Correlated, sequential event chains create signal.

## Iteration Is Mandatory

SIEM tuning is not a project — it is a continuous process. Run a weekly review of your top alert sources. If the same rule fires 200 times a week and your analysts are closing them without action, that rule needs work.

## Tools Referenced
- Elastic Security (SIEM)
- Wazuh
- Sigma rules
- Sysmon for Windows telemetry`,
    category: "SOC",
    tags: ["SIEM", "SOC", "Detection Engineering", "Elastic"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    readTime: 7,
    publishedAt: "2025-05-14",
    likes: 0,
  },
  {
    id: "2",
    title: "Web Application Pentesting Methodology: From Recon to Report",
    excerpt:
      "A structured approach to web application penetration testing that covers every phase from initial recon through to delivering a professional report.",
    content: `Web application penetration testing without a methodology is just clicking around and hoping to find something. This writeup outlines the structured approach I use on every engagement.

## Phase 1: Scope and Rules of Engagement

Before touching a single HTTP request, clarify:
- What is in scope? (specific domains, IP ranges, authenticated vs. unauthenticated)
- What is explicitly out of scope?
- Is there a production environment or test environment?
- What is the reporting format and deadline?

Missing this step creates legal and operational risk.

## Phase 2: Passive Reconnaissance

Gather information without sending a single packet to the target:
- Google dorking for exposed sensitive paths
- Shodan and Censys for port and service enumeration
- Certificate transparency logs (crt.sh) for subdomain discovery
- WHOIS, ASN lookups

## Phase 3: Active Reconnaissance

- Directory and file brute-forcing (ffuf, gobuster)
- Technology stack identification (Wappalyzer, whatweb)
- JavaScript file analysis for exposed endpoints and API keys
- Spider/crawl the application

## Phase 4: Vulnerability Identification

Work through the OWASP Top 10 systematically:
1. Injection (SQL, command, LDAP)
2. Broken authentication and session management
3. Sensitive data exposure
4. XML External Entity (XXE)
5. Broken access control
6. Security misconfiguration
7. Cross-Site Scripting (XSS)
8. Insecure deserialization
9. Known vulnerable components
10. Insufficient logging and monitoring

## Phase 5: Exploitation

For each confirmed vulnerability:
- Document the exact reproduction steps
- Capture request/response pairs in Burp Suite
- Note the business impact

Never exploit further than necessary to prove the vulnerability.

## Phase 6: Reporting

A good pentest report has two audiences:
1. Technical team — exact reproduction steps, payloads, affected endpoints
2. Management — business risk, severity ratings (CVSS), remediation priority

## Tools Used
- Burp Suite Professional
- OWASP ZAP
- SQLMap (automated, with care)
- ffuf
- Nuclei`,
    category: "Pentesting",
    tags: ["OWASP", "Web Security", "Methodology", "Burp Suite"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    readTime: 10,
    publishedAt: "2025-04-02",
    likes: 0,
  },
  {
    id: "3",
    title: "CTF Writeup: Web Exploitation — SQL Injection to Admin Access",
    excerpt:
      "Step-by-step walkthrough of a CTF web challenge involving SQL injection, filter bypass, and privilege escalation to admin.",
    content: `This is a writeup for a web exploitation challenge from a recent CTF competition. The challenge involved bypassing a login form and escalating to admin using SQL injection techniques.

## Challenge Description

We are given a login page. The challenge description hints that the authentication mechanism has not been properly secured.

## Reconnaissance

Opening the login form and inspecting the source reveals a standard HTML form with no obvious client-side filters. The network tab shows a POST request to \`/api/auth/login\` with a JSON body.

## Initial Probe

Testing with a single quote in the username field:

\`\`\`
username: '
password: test
\`\`\`

The server returns a 500 error. SQL error details are exposed in the response body — this confirms SQL injection and tells us the database backend.

## Exploiting the Login Bypass

Classic boolean-based bypass:

\`\`\`
username: admin'--
password: anything
\`\`\`

This comments out the password check in the SQL query. The server responds with a 200 and a session token. We are in as admin.

## Post-Authentication Enumeration

As admin, we find a dashboard with a user management panel. The URL parameter \`?userId=1\` is directly interpolated into a database query. Testing:

\`\`\`
/admin/user?userId=1 UNION SELECT null,null,flag FROM flags--
\`\`\`

Returns the flag.

## Remediation

1. Use parameterized queries / prepared statements — never concatenate user input into SQL
2. Implement proper error handling (never expose raw database errors)
3. Apply least privilege principles to database users
4. Use a WAF as an additional layer, not a primary defense

## Flag

\`FLAG{sq1_1nj3ct10n_1s_n3v3r_d34d}\`

## Tools Used
- Burp Suite
- SQLMap (for verification)
- Firefox DevTools`,
    category: "CTF Writeups",
    tags: ["CTF", "SQL Injection", "Web Exploitation", "OWASP"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    readTime: 6,
    publishedAt: "2025-03-18",
    likes: 0,
  },
  {
    id: "4",
    title: "Building a Home SOC Lab with Wazuh and Elastic SIEM",
    excerpt:
      "How I set up a functional Security Operations Center lab environment at home using open-source tools — without breaking the bank.",
    content: `Running a home lab is one of the most effective ways to build practical security skills. This writeup documents how I built a functional SOC environment using free and open-source tools.

## Lab Architecture

The lab runs on a single physical machine with nested virtualization enabled. The topology:

- **Wazuh Manager** (Ubuntu 22.04 Server) — SIEM and EDR backend
- **Elastic Stack** (Ubuntu 22.04 Server) — Log storage, visualization, and alerting
- **Windows 10 endpoint** — Sysmon-instrumented, acting as a monitored workstation
- **Kali Linux** — Attacker machine for generating telemetry
- **Ubuntu Desktop** — Additional monitored endpoint

## Setting Up Wazuh

Wazuh provides agent-based endpoint monitoring. The quickstart installation script handles most of the complexity:

\`\`\`bash
curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh
bash wazuh-install.sh -a
\`\`\`

After installation, agents are deployed on Windows and Linux endpoints. Wazuh immediately begins collecting:
- File integrity monitoring (FIM) events
- Syslog entries
- Authentication events
- Process creation events (via Sysmon on Windows)

## Sysmon Configuration

Sysmon is the most valuable telemetry source on Windows endpoints. I use the SwiftOnSecurity Sysmon configuration as a baseline:

\`\`\`bash
sysmon64.exe -accepteula -i sysmonconfig.xml
\`\`\`

This captures process creation, network connections, file creation events, and registry modifications.

## Elastic Integration

Wazuh ships alerts to Elasticsearch via the Filebeat integration. Once configured, Kibana dashboards give a visual overview of the entire environment.

## Generating Attack Telemetry

Using Kali Linux against the Windows endpoint:
- Port scan with nmap (triggers Suricata IDS alerts)
- Attempted brute force (triggers authentication failure threshold rules)
- Meterpreter reverse shell (triggers process injection detection via Sysmon Event ID 8)

## What I Learned

Building this lab forced me to understand:
- How SIEM ingestion pipelines work end-to-end
- Where detection gaps appear in default configurations
- How attackers evade signature-based detections

## Components
- Wazuh 4.7
- Elastic Stack 8.x
- Sysmon (SwiftOnSecurity config)
- Suricata IDS
- Snort`,
    category: "Network Security",
    tags: ["Wazuh", "Elastic SIEM", "Home Lab", "SOC", "Sysmon"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    readTime: 12,
    publishedAt: "2025-02-10",
    likes: 0,
  },
  {
    id: "5",
    title: "Network Segmentation: VLANs, DMZ, and Firewall Rules That Make Sense",
    excerpt:
      "Practical network segmentation design — how to architect VLANs, a proper DMZ, and firewall rule sets that actually reduce your attack surface.",
    content: `Network segmentation is one of the highest-value security controls you can implement. It limits lateral movement, reduces blast radius, and makes your network easier to monitor. This writeup covers the design decisions I made when building my enterprise network simulation.

## Why Segmentation Matters

Without segmentation, a single compromised endpoint can pivot freely across your entire network. Segmentation forces attackers to break through additional controls at each layer.

## VLAN Design

The network is divided into the following segments:

| VLAN | Name | Purpose |
|------|------|---------|
| 10 | Management | Network devices, out-of-band management |
| 20 | Servers | Internal application servers |
| 30 | Workstations | User endpoints |
| 40 | DMZ | Public-facing services |
| 50 | Security | SIEM, IDS/IPS, monitoring tools |
| 99 | Quarantine | Isolated infected hosts |

Each VLAN has its own IP subnet. Inter-VLAN routing is controlled by the firewall, not the core switch.

## DMZ Design

The DMZ sits between the internet and the internal network, with two firewall interfaces:
- External firewall: internet-facing, strict inbound rules
- Internal firewall: DMZ-to-internal, deny-all default

Only the web server in the DMZ can initiate connections to the internal application server, and only on specific ports.

## Firewall Rule Principles

1. Default deny-all inbound
2. Allowlist by destination port, not source IP (for internet-facing rules)
3. Log everything that hits the deny rule
4. Explicit rules for ICMP — never implicit
5. No rule allows management traffic from DMZ to internal management VLAN

## IDS/IPS Placement

Suricata runs in IPS mode on the perimeter firewall and in IDS mode on the internal segment mirror port. This gives visibility into both perimeter and lateral movement traffic.

## Tools Used
- PNETLab (network emulation)
- Cisco IOS (router/switch configuration)
- pfSense (firewall)
- GNS3 (network design diagrams)
- Suricata (IDS/IPS)`,
    category: "Network Security",
    tags: ["VLANs", "DMZ", "Firewall", "Network Design", "Segmentation"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    readTime: 9,
    publishedAt: "2025-01-05",
    likes: 0,
  },
];

export default dummyBlogs;
