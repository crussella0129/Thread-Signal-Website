export const SITE_NAME = "Thread & Signal";
export const SITE_URL = "https://threadandsignal.com";
export const OWNER_NAME = "Charles Russella";
export const OWNER_TITLE = "Co-owner & AI developer";
export const DARIAN_NAME = "Darian Russella";
export const DARIAN_TITLE = "Co-owner & systems specialist";
export const OWNER_LOCATION = "Kent, Ohio";
export const EMAIL = "charles@threadandsignal.com";
export const DARIAN_EMAIL = "darian@threadandsignal.com";
export const CONTACT_EMAILS = [EMAIL, DARIAN_EMAIL];
export const GITHUB_URL = "https://github.com/crussella0129";
export const LINKEDIN_URL = "https://www.linkedin.com/in/cgriv/";
export const DARIAN_LINKEDIN_URL =
  "https://www.linkedin.com/in/darian-russella-170015176/";
export const SITE_DESCRIPTION =
  "We automate repetitive work, set up local AI, and teach your team how to use it. Thread & Signal is owned by Charles and Darian Russella in Kent, Ohio.";
const brief = [
  "Hi Charles and Darian,",
  "",
  "The task I would like help with:",
  "",
  "What we do now:",
  "What I would like to change:",
  "",
  "Thanks,",
].join("\r\n");
export const AUTOMATION_BRIEF_URL = `mailto:${CONTACT_EMAILS.join(",")}?subject=${encodeURIComponent("Help with a business task")}&body=${encodeURIComponent(brief)}`;
