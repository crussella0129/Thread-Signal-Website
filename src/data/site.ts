// Single source of truth for site identity. Every page/component imports from
// here — never hardcode contact details in markup.

export const SITE_NAME = 'Thread & Signal';
export const SITE_URL = 'https://threadandsignal.com';
export const OWNER_NAME = 'Charles Russella';
export const OWNER_TITLE = 'Lead Developer & Designer';
export const OWNER_LOCATION = 'Ohio, USA';

export const EMAIL = 'charles@threadandsignal.com';
export const GITHUB_URL = 'https://github.com/crussella0129';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/cgriv/';

// TODO(user): replace with the real Formspree form ID to activate the contact
// form. Until then the direct-email CTA is primary.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

export const SITE_DESCRIPTION =
  'Thread & Signal — agentic AI development studio. Custom agent harnesses and business process automation in Rust and Python, local-first LLM deployments on your hardware, harness-agnostic agent skills, and CAD/3D-printing design and lessons.';
