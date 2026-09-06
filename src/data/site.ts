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

export const SITE_DESCRIPTION =
  'AI automation consulting and local LLM deployment by Charles Russella in Ohio. Custom workflows, Rust and Python development, agent skills and team workshops.';

const automationBrief = [
  'Hi Charles,',
  '',
  'I would like to discuss an automation or local AI project.',
  '',
  'Workflow and current tools:',
  'Example input and the result we need:',
  'Where a person should review or approve the work:',
  'Hardware and where the data may be processed:',
  'Target timing and budget range (if known):',
  '',
  'Thanks,',
].join('\r\n');

export const AUTOMATION_BRIEF_URL = `mailto:${EMAIL}?subject=${encodeURIComponent('Automation project brief')}&body=${encodeURIComponent(automationBrief)}`;
