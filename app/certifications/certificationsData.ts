export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
}

const certificationsData: Certification[] = [
  {
    id: '1',
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: 'Jan 2024',
    description: 'Comprehensive ethical hacking and penetration testing skills.',
    link: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/'
  },
  {
    id: '2',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Mar 2023',
    description: 'Foundational cybersecurity knowledge and best practices.',
    link: 'https://www.comptia.org/certifications/security'
  },
  {
    id: '3',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Aug 2022',
    description: 'Cloud architecture and security on AWS platform.',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'
  }
];

export default certificationsData;
