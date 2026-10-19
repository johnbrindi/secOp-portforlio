const MAX_TITLE_LENGTH = 255;
const MAX_ISSUER_LENGTH = 120;
const MAX_DATE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_URL_LENGTH = 2048;

function normalizeText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateUrl(value: string, field: string): string | null {
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${field} must be a valid URL.`);
  }
  // Block javascript:, data:, etc. — these values are rendered as links and images
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${field} must use http or https.`);
  }
  return url.toString();
}

export type CertificationInput = {
  title?: unknown;
  issuer?: unknown;
  date?: unknown;
  description?: unknown;
  link?: unknown;
  image?: unknown;
};

/** Shared by the certification Server Actions and the /api/certifications route handlers. */
export function validateCertificationInput(input: CertificationInput) {
  const title = normalizeText(input.title, MAX_TITLE_LENGTH);
  const issuer = normalizeText(input.issuer, MAX_ISSUER_LENGTH);
  const date_issued = normalizeText(input.date, MAX_DATE_LENGTH);
  const description = normalizeText(input.description, MAX_DESCRIPTION_LENGTH);

  if (!title || !issuer || !date_issued || !description) {
    throw new Error("Title, issuer, date, and description are required.");
  }

  return {
    title,
    issuer,
    date_issued,
    description,
    link: validateUrl(normalizeText(input.link, MAX_URL_LENGTH), "Certification link"),
    image_url: validateUrl(normalizeText(input.image, MAX_URL_LENGTH), "Image URL"),
  };
}
