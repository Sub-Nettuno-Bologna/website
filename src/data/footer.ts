import { pagesData } from "./pages";

interface FooterContent {
  copyright: {
    affiliation: string;
  };
  policyLinks: { text: string; href: string }[];
}

export const footerData: FooterContent = {
  copyright: {
    affiliation: "Affiliato FIPSAS/CMAS • Riconosciuto CONI",
  },
  policyLinks: [
    { text: pagesData.safeguarding.shortTitle, href: pagesData.safeguarding.path },
  ],
};
