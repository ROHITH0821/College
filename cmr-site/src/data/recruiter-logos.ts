/**
 * Recruiter / partner marks via Clearbit’s logo CDN (PNG, widely cached).
 * Replace with /public/partners/*.svg from your press kit if you need trademark control.
 */
const cb = (domain: string) => `https://logo.clearbit.com/${domain}`;

export type RecruiterLogo = {
  name: string;
  /** Direct image URL — PNG from Clearbit or your own asset */
  logoSrc: string;
};

export const RECRUITER_LOGOS: RecruiterLogo[] = [
  { name: "Accenture", logoSrc: cb("accenture.com") },
  { name: "Amazon", logoSrc: cb("amazon.com") },
  { name: "Capgemini", logoSrc: cb("capgemini.com") },
  { name: "Cognizant", logoSrc: cb("cognizant.com") },
  { name: "Deloitte", logoSrc: cb("deloitte.com") },
  { name: "Infosys", logoSrc: cb("infosys.com") },
  { name: "TCS", logoSrc: cb("tcs.com") },
  { name: "Wipro", logoSrc: cb("wipro.com") },
  { name: "PwC", logoSrc: cb("pwc.com") },
  { name: "Juspay", logoSrc: cb("juspay.com") },
];
