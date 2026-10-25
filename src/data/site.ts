export const SITE_NAME = "Thread & Signal";
export const SITE_URL = "https://threadandsignal.com";
export const OWNER_NAME = "Charles Russella";
export const OWNER_TITLE = "Co-owner, building YardUluv";
export const DARIAN_NAME = "Darian Russella";
export const DARIAN_TITLE = "Co-owner & systems engineer"; // unchanged
export const OWNER_LOCATION = "Kent, Ohio";
export const EMAIL = "charles@threadandsignal.com";
export const DARIAN_EMAIL = "darian@threadandsignal.com";
export const CONTACT_EMAILS = [EMAIL, DARIAN_EMAIL];
export const GITHUB_URL = "https://github.com/crussella0129";
export const LINKEDIN_URL = "https://www.linkedin.com/in/cgriv/";
export const DARIAN_LINKEDIN_URL =
  "https://www.linkedin.com/in/darian-russella-170015176/";
export const PHONE_DISPLAY = "(330) 357-2440";
export const PHONE_E164 = "+13303572440";
export const PHONE_SCHEMA = "+1-330-357-2440";
export const TEL_URL = `tel:${PHONE_E164}`;
export const SMS_URL = `sms:${PHONE_E164}`; // never add a body= parameter
export const SERVICE_AREA = [
  "Kent",
  "Akron",
  "Cleveland",
  "Canton",
  "Youngstown",
];
export const PITCH =
  "YardUluv is a sales tool we’re building for landscapers: it will turn a model of your customer’s yard into an itemized estimate, priced from your own price list.";
export const SITE_DESCRIPTION =
  "Thread & Signal LLC is building YardUluv, a sales tool for landscapers in Northeast Ohio. Owned by Charles and Darian Russella in Kent, Ohio.";
export const SOCIAL_IMAGE = "/social-card-yarduluv.png";
export const SOCIAL_IMAGE_ALT =
  "YardUluv, a sales tool for landscapers, in development at Thread & Signal in Kent, Ohio. Call or text Charles at (330) 357-2440. Beside the text, an angled 3D illustration of a sample front yard with a new planting bed, and tags for 324 square feet of bed, 56 feet of edging and 2 loads of haul-off.";
const brief = [
  "Hi Charles and Darian,",
  "",
  "Company:",
  "Town:",
  "What we install:",
  "How we price jobs now:",
  "Best time to call me:",
  "",
  "Thanks,",
].join("\r\n");
export const CONTACT_BRIEF_URL = `mailto:${CONTACT_EMAILS.join(",")}?subject=${encodeURIComponent("YardUluv")}&body=${encodeURIComponent(brief)}`;
// Keep the old name: docs/design-studies imports it, and `astro check` fails without it.
export const AUTOMATION_BRIEF_URL = CONTACT_BRIEF_URL;
